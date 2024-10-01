import { Router } from "express"
import cors from "cors"
import { wrapHandler } from "@medusajs/utils"
import { ConfigModule } from "@medusajs/medusa"
import crypto from "crypto";

const generateUniqueToken = () => {

  // Generate 32 random bytes
  const randomBytes = crypto.randomBytes(32)

  // Convert the random bytes to a hexadecimal string
  const token = randomBytes.toString("hex")

  return token
}



const route = Router()

export default (app: Router, options: ConfigModule) => {
  const { projectConfig } = options

  const corsOptions = {
    origin: projectConfig.store_cors?.split(",") || [],
    credentials: true,
  }

  app.use("/store", route)

  route.options("/subscription-requests", cors(corsOptions))
  route.post("/subscription-requests", cors(corsOptions), wrapHandler(async (req, res) => {
    const subscriptionRequestService = req.scope.resolve("subscriptionRequestService")
    
    const { email } = req.body

    if (!email) {
      res.status(400).json({
        message: "Email is required",
      })
      return
    }

    try {
      const token = generateUniqueToken()
      const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

      const subscriptionRequest = await subscriptionRequestService.create({
        email,
        token,
        expires_at,
      })

      res.json({
        subscription_request: subscriptionRequest,
        token,
      })
    } catch (error) {
      console.error("Error creating subscription request:", error)
      res.status(500).json({
        message: "An error occurred while processing your request",
        error: error.message,
      })
    }
  }))

  return app
}