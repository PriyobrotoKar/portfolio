import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'astro/zod'
import { contactSchema, type ApiResponse } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import Animate from '@/components/Animate'

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof contactSchema>> = async (
    data
  ) => {
    const toastId = toast.loading('Please Wait...')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result: ApiResponse = await res.json()
      if (!res.ok) {
        throw new Error(result.message)
      }
      toast.success(result.message, { id: toastId })
    } catch (error: any) {
      toast.error(error.message, { id: toastId })
    }
  }

  return (
    <Animate
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <form className="space-y-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <Input type="text" placeholder="Name" {...register('name')} />
            <Input type="email" placeholder="Email" {...register('email')} />
          </div>
          <Textarea placeholder="Message..." {...register('message')} />
        </div>
        <Button disabled={isSubmitting} className="w-full">
          Submit
        </Button>
      </form>
    </Animate>
  )
}

export default ContactForm
