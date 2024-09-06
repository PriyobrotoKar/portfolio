import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/types";
import type { APIRoute } from "astro";
import { z } from "zod";
export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? "0.0.0.0";

  const data = await request.json();
  try {
    const parsedData = contactSchema.parse(data);

    //TODO: Save it in the database
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
    }

    //create or update the submission if it doesn't exist or has expired
    const submission = await prisma.submission.upsert({
      where: {
        email: parsedData.email,
        ip,
      },
      update: {
        ...parsedData,
        ip,
      },
      create: {
        ...parsedData,
        ip,
      },
    });

    //TODO: send an email to the user

    return Response.json(
      {
        status: "success",
        message: "Contact form submitted successfully",
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
