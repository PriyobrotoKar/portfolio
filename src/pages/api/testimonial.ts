import { prisma } from '@/lib/prisma'
import { createTestimonialSchema } from '@/lib/types'
import type { APIRoute } from 'astro'
export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  try {
    const parsedData = createTestimonialSchema.parse(data)

    const { id } = await prisma.testimonial.create({
      data: parsedData
    })

    return Response.json({
      status: 'success',
      message: 'Testimonial Created',
      id
    })
  } catch (error: any) {
    return Response.json({
      status: 'error',
      message: error.message
    })
  }
}
