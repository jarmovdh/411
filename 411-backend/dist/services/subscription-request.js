"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_1 = require("@medusajs/medusa");
const subscription_request_1 = require("../models/subscription-request");
const medusa_core_utils_1 = require("medusa-core-utils");
class SubscriptionRequestService extends medusa_1.TransactionBaseService {
    constructor(container) {
        super(container);
    }
    async create(data) {
        return this.atomicPhase_(async (manager) => {
            const subscriptionRequestRepository = manager.getRepository(subscription_request_1.SubscriptionRequest);
            const subscriptionRequest = subscriptionRequestRepository.create(data);
            return await subscriptionRequestRepository.save(subscriptionRequest);
        });
    }
    async findOne(where, config) {
        const manager = this.activeManager_;
        const subscriptionRequestRepository = manager.getRepository(subscription_request_1.SubscriptionRequest);
        const subscriptionRequest = await subscriptionRequestRepository.findOne({
            where,
            ...config,
        });
        if (!subscriptionRequest) {
            throw new medusa_core_utils_1.MedusaError(medusa_core_utils_1.MedusaError.Types.NOT_FOUND, `Subscription request was not found`);
        }
        return subscriptionRequest;
    }
    async confirm(token) {
        return this.atomicPhase_(async (manager) => {
            const subscriptionRequestRepository = manager.getRepository(subscription_request_1.SubscriptionRequest);
            const subscriptionRequest = await subscriptionRequestRepository.findOne({
                where: { token }
            });
            if (!subscriptionRequest) {
                throw new medusa_core_utils_1.MedusaError(medusa_core_utils_1.MedusaError.Types.NOT_FOUND, `Subscription request with token ${token} was not found`);
            }
            if (new Date() > subscriptionRequest.expires_at) {
                throw new medusa_core_utils_1.MedusaError(medusa_core_utils_1.MedusaError.Types.INVALID_DATA, `Subscription request with token ${token} has expired`);
            }
            subscriptionRequest.confirmed_at = new Date();
            await subscriptionRequestRepository.save(subscriptionRequest);
            return subscriptionRequest;
        });
    }
    async delete(subscriptionRequestId) {
        return this.atomicPhase_(async (manager) => {
            const subscriptionRequestRepository = manager.getRepository(subscription_request_1.SubscriptionRequest);
            await subscriptionRequestRepository.delete(subscriptionRequestId);
        });
    }
}
exports.default = SubscriptionRequestService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc3Vic2NyaXB0aW9uLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FHeUI7QUFDekIseUVBQW9FO0FBQ3BFLHlEQUErQztBQUcvQyxNQUFNLDBCQUEyQixTQUFRLCtCQUFzQjtJQUk3RCxZQUFZLFNBQVM7UUFDbkIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBSVo7UUFDQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ3pDLE1BQU0sNkJBQTZCLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQywwQ0FBbUIsQ0FBQyxDQUFBO1lBQ2hGLE1BQU0sbUJBQW1CLEdBQUcsNkJBQTZCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3RFLE9BQU8sTUFBTSw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUN0RSxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUNYLEtBQTRDLEVBQzVDLE1BQXVEO1FBRXZELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUE7UUFDbkMsTUFBTSw2QkFBNkIsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLDBDQUFtQixDQUFDLENBQUE7UUFFaEYsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLDZCQUE2QixDQUFDLE9BQU8sQ0FBQztZQUN0RSxLQUFLO1lBQ0wsR0FBRyxNQUFNO1NBQ1YsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sSUFBSSwrQkFBVyxDQUNuQiwrQkFBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQzNCLG9DQUFvQyxDQUNyQyxDQUFBO1NBQ0Y7UUFFRCxPQUFPLG1CQUFtQixDQUFBO0lBQzVCLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWE7UUFDekIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUN6QyxNQUFNLDZCQUE2QixHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsMENBQW1CLENBQUMsQ0FBQTtZQUVoRixNQUFNLG1CQUFtQixHQUFHLE1BQU0sNkJBQTZCLENBQUMsT0FBTyxDQUFDO2dCQUN0RSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUU7YUFDakIsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUN4QixNQUFNLElBQUksK0JBQVcsQ0FDbkIsK0JBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUMzQixtQ0FBbUMsS0FBSyxnQkFBZ0IsQ0FDekQsQ0FBQTthQUNGO1lBRUQsSUFBSSxJQUFJLElBQUksRUFBRSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsRUFBRTtnQkFDL0MsTUFBTSxJQUFJLCtCQUFXLENBQ25CLCtCQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsbUNBQW1DLEtBQUssY0FBYyxDQUN2RCxDQUFBO2FBQ0Y7WUFFRCxtQkFBbUIsQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtZQUM3QyxNQUFNLDZCQUE2QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBRTdELE9BQU8sbUJBQW1CLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxxQkFBNkI7UUFDeEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUN6QyxNQUFNLDZCQUE2QixHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsMENBQW1CLENBQUMsQ0FBQTtZQUNoRixNQUFNLDZCQUE2QixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQ25FLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBRUQsa0JBQWUsMEJBQTBCLENBQUEifQ==