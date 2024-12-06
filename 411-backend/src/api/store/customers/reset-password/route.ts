import { Router } from 'express';
import Medusa from "@medusajs/medusa-js";

const route = Router();

route.post('/store/customers/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: "Token and password are required" });
  }

  const medusa = new Medusa({ baseUrl: process.env.MEDUSA_BACKEND_URL, maxRetries: 3 });

  try {
    await medusa.customers.resetPassword({
      token,
      password,
      email: ''
    });
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
});

export default (app) => {
  app.use('/store', route);
  return app;
};