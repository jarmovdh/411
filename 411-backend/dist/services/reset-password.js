"use strict";
// src/services/reset-password.ts
Object.defineProperty(exports, "__esModule", { value: true });
const resend_1 = require("resend");
const medusa_1 = require("@medusajs/medusa");
class ResetPasswordService extends medusa_1.TransactionBaseService {
    constructor({ resendService }) {
        super(arguments[0]);
        this.resendClient = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    async sendResetPasswordEmail(data) {
        const { email, first_name, token } = data;
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const fromEmail = process.env.SES_FROM;
        if (!fromEmail) {
            throw new Error("RESEND_FROM_EMAIL is not set in environment variables");
        }
        try {
            console.log(`Attempting to send reset email to ${email}`);
            const result = await this.resendClient.emails.send({
                from: fromEmail,
                to: email,
                subject: 'Reset Your Password',
                html: `
          <p>Hello ${first_name},</p>
          <p>You've requested to reset your password. Click the link below to set a new password:</p>
          <p><a href="${resetUrl}">Reset Password</a></p>
          <p>If you didn't request this, please ignore this email.</p>
        `
            });
            console.log(`Email sent successfully: ${JSON.stringify(result)}`);
            return result;
        }
        catch (error) {
            console.error(`Failed to send reset password email: ${error.message}`);
            throw new Error(`Failed to send reset password email: ${error.message}`);
        }
    }
}
exports.default = ResetPasswordService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvcmVzZXQtcGFzc3dvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFpQzs7QUFFakMsbUNBQStCO0FBQy9CLDZDQUF5RDtBQUV6RCxNQUFNLG9CQUFxQixTQUFRLCtCQUFzQjtJQUd2RCxZQUFZLEVBQUUsYUFBYSxFQUFFO1FBQzNCLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJO1FBQy9CLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQTtRQUN6QyxNQUFNLFFBQVEsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSx5QkFBeUIsS0FBSyxFQUFFLENBQUE7UUFFNUUsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUE7UUFDdEMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQTtTQUN6RTtRQUVELElBQUk7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3pELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNqRCxJQUFJLEVBQUUsU0FBUztnQkFDZixFQUFFLEVBQUUsS0FBSztnQkFDVCxPQUFPLEVBQUUscUJBQXFCO2dCQUM5QixJQUFJLEVBQUU7cUJBQ08sVUFBVTs7d0JBRVAsUUFBUTs7U0FFdkI7YUFDRixDQUFDLENBQUE7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNqRSxPQUFPLE1BQU0sQ0FBQTtTQUNkO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUN0RSxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtTQUN6RTtJQUNILENBQUM7Q0FDRjtBQUVELGtCQUFlLG9CQUFvQixDQUFBIn0=