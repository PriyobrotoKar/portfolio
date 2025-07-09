import { cosmic } from '@/lib/cosmic'
import { prisma } from '@/lib/prisma'
import { submitTestimonialSchema } from '@/lib/types'
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ params }) => {
  const id = params.id
  try {
    if (!id) {
      throw new Error('ID is required')
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id
      }
    })

    if (!testimonial) {
      throw new Error('Testimonial not found')
    }

    if (!testimonial.designation || !testimonial.message) {
      throw new Error('Designation and message are required')
    }

    await cosmic.objects.insertOne({
      title: testimonial.name,
      type: 'testimonials',
      metadata: {
        name: testimonial.name,
        designation: testimonial.designation,
        testimonial: testimonial.message,
        profile_picture: JSON.parse(testimonial.profilePicture!).name
      }
    })

    await prisma.testimonial.delete({
      where: {
        id: testimonial.id
      }
    })

    return Response.json({
      status: 'success',
      message: 'Testimonial Uploaded'
    })
  } catch (error: any) {
    return Response.json({
      status: 'error',
      message: error.message
    })
  }
}

const getImageBuffer = async (imgUrl: string) => {
  const res = await fetch(imgUrl)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export const PATCH: APIRoute = async ({ params, request }) => {
  const id = params.id
  const data = await request.json()
  try {
    if (!id) {
      throw new Error('ID is required')
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id
      }
    })

    if (!testimonial) {
      throw new Error(`Testimonial: ${id} is not found`)
    }

    const parsedData = submitTestimonialSchema.parse(data)

    const profileImageBuffer = await getImageBuffer(parsedData.profilePicture)

    const { media } = await cosmic.media.insertOne({
      media: {
        originalname: `${testimonial.name}.jpg`,
        buffer: profileImageBuffer
      },
      folder: 'profile-pictures'
    })

    await prisma.testimonial.update({
      where: {
        id
      },
      data: {
        ...parsedData,
        profilePicture: JSON.stringify({
          id: media.id,
          url: media.url,
          name: media.name
        })
      }
    })

    return Response.json({
      status: 'success',
      message: 'Testimonial Updated'
    })
  } catch (error: any) {
    console.log(error)
    return Response.json({
      status: 'error',
      message: error.message
    })
  }
}

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id
  try {
    if (!id) {
      throw new Error('ID is required')
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id
      }
    })

    if (!testimonial) {
      throw new Error(`Testimonial: ${id} is not found`)
    }

    if (testimonial.profilePicture) {
      const profilePicId = JSON.parse(testimonial.profilePicture).id

      await cosmic.media.deleteOne(profilePicId)
    }

    await prisma.testimonial.delete({
      where: {
        id
      }
    })

    return Response.json({
      status: 'success',
      message: 'Testimonial Deleted'
    })
  } catch (error: any) {
    return Response.json({
      status: 'error',
      message: error.message
    })
  }
}
