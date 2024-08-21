import { CustomerService, SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";

type PasswordResetEvent = {
  email: string;
};

export default async function passwordResetHandler({
  data,
  eventName,
  container,
}: SubscriberArgs<PasswordResetEvent>) {
  const customerService: CustomerService = container.resolve("customerService");

  try {
    console.log(`Handling event: ${eventName || "unknown"} for email: ${data.email}`);

    // Retrieve the customer by email
    const customer = await customerService.retrieveRegisteredByEmail(data.email);
    if (!customer) {
      throw new Error(`No customer found with email: ${data.email}`);
    }

    // Generate the password reset token using the customer ID
    if (customer && customer.id) {
      await customerService.generateResetPasswordToken(customer.id);
    } else {
      throw new Error("Customer ID is undefined or null");
    }
    console.log(`Password reset token generated successfully for: ${data.email}`);
  } catch (error) {
    console.error(`Failed to generate password reset token for: ${data.email}`, error);
  }
}

export const config: SubscriberConfig = {
  event: "customer.password_reset",
};
