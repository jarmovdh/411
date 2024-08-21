// src/loaders/reset-password.ts

import ResetPasswordSubscriber from "../subscribers/reset-password"
import ResetPasswordService from "../services/reset-password"

export default async (container, config) => {
  container.register({
    resetPasswordService: ResetPasswordService,
  })

  container.addSubscriber(ResetPasswordSubscriber)
}