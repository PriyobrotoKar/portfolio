import { prisma } from '@/lib/prisma'
import { submitTestimonialSchema } from '@/lib/types'
import type { APIRoute } from 'astro'
export const prerender = false

export const PATCH: APIRoute = async ({ params, request }) => {
  const id = params.id
  const data = await request.json()
  try {
    if (!id) {
      throw new Error('ID is required')
    }

    const parsedData = submitTestimonialSchema.parse(data)

    await prisma.testimonial.update({
      where: {
        id
      },
      data: parsedData
    })

    return Response.json({
      status: 'success',
      message: 'Testimonial Updated'
    })
  } catch (error: any) {
    return Response.json({
      status: 'error',
      message: error.message
    })
  }
}
