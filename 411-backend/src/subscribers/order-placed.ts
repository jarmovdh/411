import { type SubscriberConfig, type SubscriberArgs, OrderService } from "@medusajs/medusa";
import { Resend } from 'resend';

export default async function handleOrderPlaced({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const resendService = new Resend(process.env.RESEND_API_KEY);
  const orderService: OrderService = container.resolve("orderService");

  const order = await orderService.retrieve(data.id, { 
    relations: ["items", "customer"] 
  });

  const { email, customer, display_id, items } = order;
  const fromEmail = process.env.SES_FROM;
  if (!fromEmail) {
    throw new Error("SES_FROM is not set in environment variables");
  }

  if (!Array.isArray(items)) {
    throw new Error("Order items are not in expected array format");
  }

  // Extract first name from customer object, with fallback
  const firstName = customer?.first_name || 'Valued Customer';




  await resendService.emails.send({
    from: fromEmail,
    to: email,
    subject: `Order Confirmation #${display_id}`,
    html: `
      <h2>Hi ${firstName}! Thank you for your order!</h2>
      <p>Your order #${display_id} has been placed successfully.</p>
      <h2>Order Details:</h2>
      <ul>
        ${items.map(item => `<li>${item.title} - Quantity: ${item.quantity} </li>`).join('')}
      </ul>
      <p>As soon as your order ships, we'll send you an email with tracking information.</p>
      <p>Thank you for shopping with us!</p>
      <p>Best regards,<br>The 411 Team</p>
    `,
  });
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "order-placed-handler",
  },
};