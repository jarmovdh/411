"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const medusa_1 = require("@medusajs/medusa");
const resend_1 = require("resend");
async function handleOrderPlaced({ data, container, }) {
    const resendService = new resend_1.Resend(process.env.RESEND_API_KEY);
    const orderService = container.resolve("orderService");
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
    const firstName = (customer === null || customer === void 0 ? void 0 : customer.first_name) || 'Valued Customer';
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
exports.default = handleOrderPlaced;
exports.config = {
    event: medusa_1.OrderService.Events.PLACED,
    context: {
        subscriberId: "order-placed-handler",
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNEY7QUFDNUYsbUNBQWdDO0FBRWpCLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxFQUM5QyxJQUFJLEVBQ0osU0FBUyxHQUMyQjtJQUNwQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdELE1BQU0sWUFBWSxHQUFpQixTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sS0FBSyxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ2pELFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7S0FDakMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNyRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUN2QyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQseURBQXlEO0lBQ3pELE1BQU0sU0FBUyxHQUFHLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFVBQVUsS0FBSSxpQkFBaUIsQ0FBQztJQUs1RCxNQUFNLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksRUFBRSxTQUFTO1FBQ2YsRUFBRSxFQUFFLEtBQUs7UUFDVCxPQUFPLEVBQUUsdUJBQXVCLFVBQVUsRUFBRTtRQUM1QyxJQUFJLEVBQUU7ZUFDSyxTQUFTO3VCQUNELFVBQVU7OztVQUd2QixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLFFBQVEsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzs7Ozs7S0FLdkY7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDO0FBM0NELG9DQTJDQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUscUJBQVksQ0FBQyxNQUFNLENBQUMsTUFBTTtJQUNqQyxPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsc0JBQXNCO0tBQ3JDO0NBQ0YsQ0FBQyJ9