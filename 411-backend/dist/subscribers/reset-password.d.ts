import EventBusService from "@medusajs/medusa/dist/services/event-bus";
import ResetPasswordService from "src/services/reset-password";
declare class ResetPasswordSubscriber {
    resetPasswordService: ResetPasswordService;
    eventBusService: EventBusService;
    constructor({ eventBusService, resetPasswordService }: {
        eventBusService: any;
        resetPasswordService: any;
    });
    handlePasswordReset: (data: any) => Promise<void>;
}
export default ResetPasswordSubscriber;
