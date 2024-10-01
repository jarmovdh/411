import { type SubscriberConfig, type SubscriberArgs, OrderService } from "@medusajs/medusa";
import { Resend } from 'resend';
import { Fulfillment } from "@medusajs/medusa";

export default async function handleOrderShipped({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const resendService = new Resend(process.env.RESEND_API_KEY);
  const orderService: OrderService = container.resolve("orderService");

  const order = await orderService.retrieve(data.id, { 
    relations: ["items", "shipping_address", "customer", "fulfillments", "fulfillments.tracking_links"] 
  });

  const { email } = order.customer;
  const { first_name } = order.shipping_address;
  const { display_id, items, fulfillments } = order;

  const fromEmail = process.env.SES_FROM;
  if (!fromEmail) {
    throw new Error("SES_FROM is not set in environment variables");
  }

  if (!Array.isArray(items)) {
    throw new Error("Order items are not in expected array format");
  }

  // Extract tracking information from fulfillments
  const trackingInfo = fulfillments.flatMap((fulfillment: Fulfillment) => 
    fulfillment.tracking_links.map(link => ({
      number: link.tracking_number,
      url: link.url
    }))
  );

  const trackingSection = trackingInfo.length > 0
    ? `
      <p>You can track your order using the following tracking information:</p>
      <ul>
        ${trackingInfo.map(info => `
          <li>
            Tracking Number: <b>${info.number}</b>
            ${info.url ? `<br><a href="${info.url}">Track your package</a>` : ''}
          </li>
        `).join('')}
      </ul>
    `
    : '<p>No tracking information is available at this time.</p>';

  await resendService.emails.send({
    from: fromEmail,
    to: email,
    subject: `Your Order #${display_id} Has Been Shipped`,
    html: `
      <p>Hello ${first_name},</p>
      <p>Great news! Your order #${display_id} has been shipped.</p>
      <h3>Order Details:</h3>
      <ul>
        ${items.map(item => `<li>${item.title} - Quantity: ${item.quantity}</li>`).join('')}
      </ul>
      ${trackingSection}
      <p>Thank you for shopping with us!</p>
      <p>Best regards,<br>The 411 Team</p>
    `,
  });
}

export const config: SubscriberConfig = {
  event: OrderService.Events.SHIPMENT_CREATED,
  context: {
    subscriberId: "order-shipped-handler",
  },
};