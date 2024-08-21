import { Router } from 'express';
import Medusa from "@medusajs/medusa-js";

const route = Router();

route.post('/store/customers/password-token', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const medusa = new Medusa({ baseUrl: process.env.MEDUSA_BACKEND_URL, maxRetries: 3 });

  try {
    await medusa.customers.generatePasswordToken({ email });
    res.status(200).json({ message: 'Password reset token generated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate password reset token', error: error.message });
  }
});

export default (app) => {
  app.use('/store', route);
  return app;
};
