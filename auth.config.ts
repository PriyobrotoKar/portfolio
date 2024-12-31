import Google from '@auth/core/providers/google'
import { defineConfig } from 'auth-astro'

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.AUTH_GOOGLE_ID as string,
      clientSecret: import.meta.env.AUTH_GOOGLE_SECRET as string
    })
  ]
})
