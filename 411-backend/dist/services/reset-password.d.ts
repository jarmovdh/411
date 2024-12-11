import { Resend } from 'resend';
import { TransactionBaseService } from "@medusajs/medusa";
declare class ResetPasswordService extends TransactionBaseService {
    resendClient: Resend;
    constructor({ resendService }: {
        resendService: any;
    });
    sendResetPasswordEmail(data: any): Promise<import("resend").CreateEmailResponse>;
}
export default ResetPasswordService;
