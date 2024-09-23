import { type SubscriberConfig, type SubscriberArgs, OrderService, FulfillmentService } from "@medusajs/medusa";
import { Resend } from 'resend';

export default async function handleOrderShipped({
  data,
  container,
}: SubscriberArgs<Record<string, any>>) {
  const resendService = new Resend(process.env.RESEND_API_KEY);
  const orderService: OrderService = container.resolve("orderService");
  const fulfillmentService: FulfillmentService = container.resolve("fulfillmentService");

  const order = await orderService.retrieve(data.id, { 
    relations: ["items", "shipping_address", "customer", "fulfillments"] 
  });

  const { email } = order.customer;
  const { first_name, last_name } = order.shipping_address;
  const { display_id, items, fulfillments } = order;

  const fromEmail = process.env.SES_FROM;
  if (!fromEmail) {
    throw new Error("SES_FROM is not set in environment variables");
  }

  if (!Array.isArray(items)) {
    throw new Error("Order items are not in expected array format");
  }

  // Get tracking information
  let trackingInfo = '';
  if (fulfillments && fulfillments.length > 0) {
    const latestFulfillment = fulfillments[fulfillments.length - 1];
    const tracking_numbers = latestFulfillment.tracking_numbers;
    const tracking_links = latestFulfillment.tracking_links;

    if (tracking_numbers && tracking_numbers.length > 0) {
      trackingInfo += `<p>Tracking Number(s): ${tracking_numbers.join(', ')}</p>`;
    }
    if (tracking_links && tracking_links.length > 0) {
      trackingInfo += `<p>Tracking Link(s):<br>${tracking_links.map(link => `<a href="${link.url}">${link.url}</a>`).join('<br>')}</p>`;
    }
  }

  await resendService.emails.send({
    from: fromEmail,
    to: email,
    subject: `Your Order #${display_id} Has Been Shipped`,
    html: `
      <h3>Hello ${first_name} ${last_name},</h3>
      <p>Great news! Your order #${display_id} has been shipped.</p>
      <h2>Order Details:</h2>
      <ul>
        ${items.map(item => `<li>${item.title} - Quantity: ${item.quantity}</li>`).join('')}
      </ul>
      ${trackingInfo}
      <p>Thank you for shopping with us!</p>
    `,
  });
}

export const config: SubscriberConfig = {
  event: OrderService.Events.SHIPMENT_CREATED,
  context: {
    subscriberId: "order-shipped-handler",
  },
};