import { useState } from 'react'

const columns = [
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

const testimonials = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    designation: 'CEO',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar, nunc nec ultricies.'
  },
  {
    name: 'Jane Doe',
    email: 'janedeo@gmail.com',
    designation: 'CTO',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar, nunc nec ultricies.'
  }
]

export default function TestimonialTable() {
  const [active, setActive] = useState(-1)

  return (
    <table className="text-left">
      <thead className="border-b">
        <tr>
          {columns.map((column) => (
            <th className="p-2">{column.name}</th>
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
            className="hover:bg-muted transition-all"
          >
            {columns.map((column) => (
              <td className="p-2 min-w-32 ">
                <p
                  className={
                    active === ind ? 'line-clamp-none' : 'line-clamp-1'
                  }
                >
                  {
                    testimonial[
                      column.selector as keyof (typeof testimonials)[0]
                    ]
                  }
                </p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
