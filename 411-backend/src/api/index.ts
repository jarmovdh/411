import { Router } from "express"
import bodyParser from "body-parser"
import configureSubscriptionRequests from "./store/subscription-requests"
import confirmSubscription from "./store/subscription-requests/confirm"
import { ConfigModule } from "@medusajs/medusa"
import deleteCustomerRoute from "./store/customers/delete"


export default (container, config: ConfigModule) => {
  const app = Router()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  confirmSubscription(app)
  configureSubscriptionRequests(app, config)
 
  const deleteRouter = deleteCustomerRoute(container)
  app.use("/store/customers", deleteRouter)

  return app
}