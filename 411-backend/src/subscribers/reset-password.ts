// src/subscribers/reset-password.ts

import EventBusService from "@medusajs/medusa/dist/services/event-bus"
import ResetPasswordService from "src/services/reset-password"

class ResetPasswordSubscriber {
  resetPasswordService: ResetPasswordService
  eventBusService: EventBusService

  constructor({ eventBusService, resetPasswordService }) {
    this.resetPasswordService = resetPasswordService
    this.eventBusService = eventBusService

    this.eventBusService.subscribe("customer.password_reset", this.handlePasswordReset)
  }

  handlePasswordReset = async (data) => {
    try {
      await this.resetPasswordService.sendResetPasswordEmail(data)
      console.log(`Password reset email sent to ${data.email}`)
    } catch (error) {
      console.error(`Failed to send password reset email to ${data.email}:`, error)
    }
  }
}

export default ResetPasswordSubscriber