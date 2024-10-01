import { type SubscriberConfig, type SubscriberArgs, CustomerService } from "@medusajs/medusa";
import { Resend } from 'resend';

export default async function handleCustomerCreated({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const resendService = new Resend(process.env.RESEND_API_KEY);
  const customerService: CustomerService = container.resolve("customerService");

  const customer = await customerService.retrieve(data.id);

  const { email, first_name } = customer;

  const fromEmail = process.env.SES_FROM;
  if (!fromEmail) {
    throw new Error("SES_FROM is not set in environment variables");
  }

  await resendService.emails.send({
    from: fromEmail,
    to: email,
    subject: "Welcome to 411!",
    html: `
      <h3>Welcome ${first_name}!</h3>
      <p>Thank you for registering with 411 radio. We're excited to have you as a new member of our community!</p>
      <p>Here are a few things you can do with your new account:</p>
      <ul>
        <li>Add shows to your favorites</li>
        <li>See tracklists</li>
        <li>Check out exclusive deals for  members</li>
      </ul>
      <p>If you have any questions or need assistance, don't hesitate to contact our customer support team.</p>
      <p>Best regards,<br>The 411 Team</p>
    `,
  });
}

export const config: SubscriberConfig = {
  event: CustomerService.Events.CREATED,
  context: {
    subscriberId: "customer-created-handler",
  },
};