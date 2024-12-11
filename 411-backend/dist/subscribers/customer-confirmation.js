"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const medusa_1 = require("@medusajs/medusa");
const resend_1 = require("resend");
async function handleCustomerCreated({ data, container, }) {
    const resendService = new resend_1.Resend(process.env.RESEND_API_KEY);
    const customerService = container.resolve("customerService");
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
exports.default = handleCustomerCreated;
exports.config = {
    event: medusa_1.CustomerService.Events.CREATED,
    context: {
        subscriberId: "customer-created-handler",
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItY29uZmlybWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1YnNjcmliZXJzL2N1c3RvbWVyLWNvbmZpcm1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBK0Y7QUFDL0YsbUNBQWdDO0FBRWpCLEtBQUssVUFBVSxxQkFBcUIsQ0FBQyxFQUNsRCxJQUFJLEVBQ0osU0FBUyxHQUMyQjtJQUNwQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdELE1BQU0sZUFBZSxHQUFvQixTQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFOUUsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV6RCxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLFFBQVEsQ0FBQztJQUV2QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUN2QyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsTUFBTSxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLEVBQUUsU0FBUztRQUNmLEVBQUUsRUFBRSxLQUFLO1FBQ1QsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixJQUFJLEVBQUU7b0JBQ1UsVUFBVTs7Ozs7Ozs7OztLQVV6QjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqQ0Qsd0NBaUNDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSx3QkFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPO0lBQ3JDLE9BQU8sRUFBRTtRQUNQLFlBQVksRUFBRSwwQkFBMEI7S0FDekM7Q0FDRixDQUFDIn0=