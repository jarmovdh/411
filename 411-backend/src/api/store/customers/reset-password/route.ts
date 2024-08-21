import middlewares from "@medusajs/medusa/dist/api/middlewares"
import { Router } from "express"

const router = Router()

export default (app) => {
  app.use("/store/auth", router)

  router.post("/reset-password", middlewares.wrap(require("./reset-password").default))

  return app
}

export const post = async (req, res) => {
  const { email } = req.body

  try {
    await req.scope.resolve("customerService").generatePasswordToken(email)
    res.sendStatus(204)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}