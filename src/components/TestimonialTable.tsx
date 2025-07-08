import { cn } from '@/lib/utils'
import type { testimonial } from '@prisma/client'
import { useState } from 'react'
import { Button } from './ui/button'
import { FiCheck, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'
import { UserIcon } from 'lucide-react'

const columns = [
  {
    name: 'Profile',
    selector: 'profilePicture'
  },
  {
    name: 'Name',
    selector: 'name'
  },
  {
    name: 'Email',
    selector: 'email'
  },
  {
    name: 'Designation',
    selector: 'designation'
  },
  {
    name: 'Testimonial',
    selector: 'message'
  }
]

export default function TestimonialTable({
  testimonials: initialTestimonials
}: {
  testimonials: testimonial[]
}) {
  const [active, setActive] = useState(-1)
  const [testimonials, setTestimonials] = useState(initialTestimonials)

  const acceptTestimonial = async (id: string) => {
    let toastId = undefined
    try {
      toastId = toast.loading('Please wait..')
      const response = await fetch(`/api/testimonial/${id}`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Failed to upload testimonial')
      }
      // Handle success
      const result = await response.json()
      if (result.status === 'error') {
        throw new Error(result.message)
      }

      setTestimonials((prev) => prev.filter((t) => t.id !== id))

      toast.success('Testimonial added to site', {
        id: toastId
      })
    } catch (e) {
      // Handle error
      const error = e as Error
      console.error(error.message)
      toast.error(error.message, {
        id: toastId
      })
    }
  }

  const deleteTestimonial = async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id))

    try {
      const response = await fetch(`/api/testimonial/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to delete testimonial')
      }
      // Handle success
      const result = await response.json()
      if (result.status === 'error') {
        throw new Error(result.message)
      }
    } catch (error) {
      // Handle error
      console.error((error as Error).message)
    }
  }

  return (
    <table className="text-left w-full">
      <thead className="border-b">
        <tr>
          {columns.map((column) => (
            <th
              className={cn(
                'p-2 min-w-32 ',
                column.name === 'Profile' && 'min-w-fit',
                column.name === 'Testimonial' && 'w-full'
              )}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {testimonials.map((testimonial, ind) => (
          <tr
            onClick={() =>
              setActive((prev) => {
                return prev === ind ? -1 : ind
              })
            }
            className="hover:bg-muted h-14 transition-all"
          >
            <td>
              {testimonial.profilePicture ? (
                <img
                  src={JSON.parse(testimonial.profilePicture).url || ''}
                  alt=""
                  width={24}
                  height={24}
                  className="mx-auto rounded-full"
                />
              ) : (
                <div className="bg-secondary p-2 w-fit rounded-full mx-auto">
                  <UserIcon size={16} />
                </div>
              )}
            </td>
            {columns.map((column) => {
              if (column.selector === 'profilePicture') {
                return
              }
              return (
                <td className="p-2 ">
                  <p
                    className={
                      active === ind ? 'line-clamp-none' : 'line-clamp-1'
                    }
                  >
                    {testimonial[
                      column.selector as keyof testimonial
                    ]?.toString()}
                  </p>
                </td>
              )
            })}
            <td className="pr-2">
              <Button
                size={'icon'}
                variant={'secondary'}
                className="align-middle"
                onClick={(e) => {
                  e.stopPropagation()
                  acceptTestimonial(testimonial.id)
                }}
              >
                <FiCheck />
              </Button>
            </td>
            <td className="pr-2">
              <Button
                size={'icon'}
                variant={'destructive'}
                className="align-middle"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteTestimonial(testimonial.id)
                }}
              >
                <FiTrash2 />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
