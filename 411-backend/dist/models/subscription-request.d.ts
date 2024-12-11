import { BaseEntity } from "@medusajs/medusa";
export declare class SubscriptionRequest extends BaseEntity {
    id: string;
    email: string;
    token: string;
    expires_at: Date;
    confirmed_at: Date;
    private beforeInsert;
}
