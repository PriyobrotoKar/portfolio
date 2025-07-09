import type { TypeOf, z } from 'astro/zod'
import { contactSchema } from './types'

type PayloadType = z.infer<typeof contactSchema>

const createEmbed = (data: PayloadType) => {
  // create the embed json
  return {
    content: `Hey <@774217882698776589>! ${data.name} sent you a message`,
    embeds: [
      {
        color: 2829617,
        fields: [
          {
            name: 'Name',
            value: `\`\`\`${data.name}\`\`\``
          },
          {
            name: 'Email',
            value: `\`\`\`${data.email}\`\`\``
          },
          {
            name: 'Message',
            value: `\`\`\`${data.message}\`\`\``
          }
        ]
      }
    ]
  }
}

const sendDiscordNotification = async (payload: PayloadType) => {
  // send the webhook message to my discord server
  const res = await fetch(
    `https://discord.com/api/webhooks/${import.meta.env.WEBHOOK_ID}/${
      import.meta.env.WEBHOOK_TOKEN
    }`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(createEmbed(payload))
    }
  )
  if (!res.ok) {
    console.log('Error while sending discord notification', await res.json())
    throw new Error('Something went wrong! Please try again later')
  }
}

export default sendDiscordNotification
