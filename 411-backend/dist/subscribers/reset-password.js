"use strict";
// src/subscribers/reset-password.ts
Object.defineProperty(exports, "__esModule", { value: true });
class ResetPasswordSubscriber {
    constructor({ eventBusService, resetPasswordService }) {
        this.handlePasswordReset = async (data) => {
            try {
                await this.resetPasswordService.sendResetPasswordEmail(data);
                console.log(`Password reset email sent to ${data.email}`);
            }
            catch (error) {
                console.error(`Failed to send password reset email to ${data.email}:`, error);
            }
        };
        this.resetPasswordService = resetPasswordService;
        this.eventBusService = eventBusService;
        this.eventBusService.subscribe("customer.password_reset", this.handlePasswordReset);
    }
}
exports.default = ResetPasswordSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3Vic2NyaWJlcnMvcmVzZXQtcGFzc3dvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9DQUFvQzs7QUFLcEMsTUFBTSx1QkFBdUI7SUFJM0IsWUFBWSxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRTtRQU9yRCx3QkFBbUIsR0FBRyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbkMsSUFBSTtnQkFDRixNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7YUFDMUQ7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7YUFDOUU7UUFDSCxDQUFDLENBQUE7UUFiQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUE7UUFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUE7UUFFdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDckYsQ0FBQztDQVVGO0FBRUQsa0JBQWUsdUJBQXVCLENBQUEifQ==