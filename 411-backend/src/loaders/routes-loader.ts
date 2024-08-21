import { Router } from "express";
import passwordResetRoutes from "../api/store/customers/password-token/route";

export default async ({ app }: { app: Router }) => {
  // Register the password reset route
  app.use("/store/custom", passwordResetRoutes);
};
