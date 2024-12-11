"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const medusa_1 = require("@medusajs/medusa");
const resend_1 = require("resend");
async function handleOrderShipped({ data, container, }) {
    const resendService = new resend_1.Resend(process.env.RESEND_API_KEY);
    const orderService = container.resolve("orderService");
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
    const trackingInfo = fulfillments.flatMap((fulfillment) => fulfillment.tracking_links.map(link => ({
        number: link.tracking_number,
        url: link.url
    })));
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
exports.default = handleOrderShipped;
exports.config = {
    event: medusa_1.OrderService.Events.SHIPMENT_CREATED,
    context: {
        subscriberId: "order-shipped-handler",
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItc2hpcHBlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdWJzY3JpYmVycy9vcmRlci1zaGlwcGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE0RjtBQUM1RixtQ0FBZ0M7QUFHakIsS0FBSyxVQUFVLGtCQUFrQixDQUFDLEVBQy9DLElBQUksRUFDSixTQUFTLEdBQzJCO0lBQ3BDLE1BQU0sYUFBYSxHQUFHLElBQUksZUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0QsTUFBTSxZQUFZLEdBQWlCLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFckUsTUFBTSxLQUFLLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDakQsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsNkJBQTZCLENBQUM7S0FDcEcsQ0FBQyxDQUFDO0lBRUgsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDakMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztJQUM5QyxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFbEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDdkMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztLQUNqRTtJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztLQUNqRTtJQUVELGlEQUFpRDtJQUNqRCxNQUFNLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBd0IsRUFBRSxFQUFFLENBQ3JFLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWU7UUFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO0tBQ2QsQ0FBQyxDQUFDLENBQ0osQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUM3QyxDQUFDLENBQUM7OztVQUdJLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzs7a0NBRUQsSUFBSSxDQUFDLE1BQU07Y0FDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxFQUFFOztTQUV2RSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzs7S0FFZDtRQUNELENBQUMsQ0FBQywyREFBMkQsQ0FBQztJQUVoRSxNQUFNLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksRUFBRSxTQUFTO1FBQ2YsRUFBRSxFQUFFLEtBQUs7UUFDVCxPQUFPLEVBQUUsZUFBZSxVQUFVLG1CQUFtQjtRQUNyRCxJQUFJLEVBQUU7aUJBQ08sVUFBVTttQ0FDUSxVQUFVOzs7VUFHbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssZ0JBQWdCLElBQUksQ0FBQyxRQUFRLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7O1FBRW5GLGVBQWU7OztLQUdsQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUE5REQscUNBOERDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxxQkFBWSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDM0MsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLHVCQUF1QjtLQUN0QztDQUNGLENBQUMifQ==