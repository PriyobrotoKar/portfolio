import { contactSchema } from "@/lib/types";
import type { APIRoute } from "astro";
import { z } from "zod";
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  try {
    const parsedData = contactSchema.parse(data);

    //TODO: Save it in the database

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
