import { TransactionBaseService, FindConfig } from "@medusajs/medusa";
import { SubscriptionRequest } from "../models/subscription-request";
import { EntityManager, FindOptionsWhere } from "typeorm";
declare class SubscriptionRequestService extends TransactionBaseService {
    protected readonly manager_: EntityManager;
    protected transactionManager_: EntityManager;
    constructor(container: any);
    create(data: {
        email: string;
        token: string;
        expires_at: Date;
    }): Promise<SubscriptionRequest>;
    findOne(where: FindOptionsWhere<SubscriptionRequest>, config?: Omit<FindConfig<SubscriptionRequest>, "where">): Promise<SubscriptionRequest | null>;
    confirm(token: string): Promise<SubscriptionRequest>;
    delete(subscriptionRequestId: string): Promise<void>;
}
export default SubscriptionRequestService;
