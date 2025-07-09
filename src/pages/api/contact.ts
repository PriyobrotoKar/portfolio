import sendDiscordNotification from "@/lib/discord";
import { sendMail } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/types";
import type { APIRoute } from "astro";
export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? "0.0.0.0";

  const data = await request.json();
  try {
    const parsedData = contactSchema.parse(data);

    //check if the email or ip is already in the database
    const query = {
      OR: [
        {
          email: parsedData.email,
        },
        {
          ip,
        },
      ],
    };
    const existingSubmission = await prisma.submission.findFirst({
      where: query,
    });

    if (existingSubmission) {
      //check if the submission was made in the last 12 hours
      const hasExpired =
        new Date().getTime() - existingSubmission.updatedAt.getTime() >
        12 * 60 * 60 * 1000;

      if (!hasExpired) {
        throw new Error("You have already submitted a form recently");
      }
      //Update the expired submission
      await prisma.submission.update({
        where: {
          id: existingSubmission.id,
        },
        data: {
          ...parsedData,
          ip,
        },
      });
    } else {
      //create the submission if it doesn't exist
      await prisma.submission.create({
        data: {
          ...parsedData,
          ip,
        },
      });
    }

    await sendDiscordNotification(parsedData);
    sendMail(parsedData.email);

    return Response.json(
      {
        status: "success",
        message: "Submitted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message || "Something went wrong",
      }),
      {
        status: 400,
      }
    );
  }
};
