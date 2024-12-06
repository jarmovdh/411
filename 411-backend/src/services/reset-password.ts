// src/services/reset-password.ts

import { Resend } from 'resend'
import { TransactionBaseService } from "@medusajs/medusa"

class ResetPasswordService extends TransactionBaseService {
  resendClient: Resend
  
  constructor({ resendService }) {
    super(arguments[0])
    this.resendClient = new Resend(process.env.RESEND_API_KEY)
  }

  async sendResetPasswordEmail(data) {
    const { email, first_name, token } = data
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

    const fromEmail = process.env.SES_FROM
    if (!fromEmail) {
      throw new Error("RESEND_FROM_EMAIL is not set in environment variables")
    }

    try {
      console.log(`Attempting to send reset email to ${email}`)
      const result = await this.resendClient.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Reset Your Password',
        html: `
          <p>Hello ${first_name},</p>
          <p>You've requested to reset your password. Click the link below to set a new password:</p>
          <p><a href="${resetUrl}">Reset Password</a></p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      })
      console.log(`Email sent successfully: ${JSON.stringify(result)}`)
      return result
    } catch (error) {
      console.error(`Failed to send reset password email: ${error.message}`)
      throw new Error(`Failed to send reset password email: ${error.message}`)
    }
  }
}

export default ResetPasswordService