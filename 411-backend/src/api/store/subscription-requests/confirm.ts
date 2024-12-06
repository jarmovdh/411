import { Router } from "express"
import { wrapHandler } from "@medusajs/utils"

const route = Router()

export default (app) => {
  app.use("/store/subscription-requests", route)

  route.post("/confirm", wrapHandler(async (req, res) => {
    const { token } = req.body

    const subscriptionRequestService = req.scope.resolve("subscriptionRequestService")

    try {
      const subscription = await subscriptionRequestService.confirm(token)
      res.json({ email: subscription.email })
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }))

  return app
}