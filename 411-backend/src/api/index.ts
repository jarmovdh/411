import { Router } from "express"
import bodyParser from "body-parser"
import configureSubscriptionRequests from "./store/subscription-requests"
import confirmSubscription from "./store/subscription-requests/confirm"
import { ConfigModule } from "@medusajs/medusa"

export default (container, config: ConfigModule) => {
  const app = Router()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  confirmSubscription(app)


  configureSubscriptionRequests(app, config)

  return app
}