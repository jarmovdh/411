import { type SubscriberConfig, type SubscriberArgs, OrderService } from "@medusajs/medusa";
import { Resend } from 'resend';

export default async function handleOrderPlaced({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {  // Change `Record<string, string>` to `Record<string, any>` to accommodate various data types
  const resendService = new Resend(process.env.RESEND_API_KEY); // Use API key from environment variables
  const orderService: OrderService = container.resolve("orderService");

  const { email, customer, display_id,  total, items } = await orderService.retrieve(data.id, { relations: ["items"] }); 
  const fromEmail = process.env.SES_FROM;
  if (!fromEmail) {
    throw new Error("SES_FROM is not set in environment variables");
  }

  if (!Array.isArray(items)) {
    throw new Error("Order items are not in expected array format");
  }

  await resendService.emails.send({
    from: fromEmail,
    to: email,
    subject: `Order Confirmation #${display_id}`,
    html: `
      <h2>Hi ${customer}! Thank you for your order!</h2>
      <p>Your order #${display_id} has been placed successfully.</p>
      <p>Total: ${total}</p>
      <h2>Order Items:</h2>
      <ul>
        ${items.map(item => `<li>${item.title} - Quantity: ${item.quantity}</li>`).join('')}
      </ul>
    `,
  });
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "order-placed-handler",
  },
};