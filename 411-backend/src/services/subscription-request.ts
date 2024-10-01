import { 
  TransactionBaseService,
  FindConfig,
} from "@medusajs/medusa"
import { SubscriptionRequest } from "../models/subscription-request"
import { MedusaError } from "medusa-core-utils"
import { EntityManager, DeleteResult, FindOptionsWhere } from "typeorm"

class SubscriptionRequestService extends TransactionBaseService {
  protected readonly manager_: EntityManager
  protected transactionManager_: EntityManager

  constructor(container) {
    super(container)
  }

  async create(data: {
    email: string
    token: string
    expires_at: Date
  }): Promise<SubscriptionRequest> {
    return this.atomicPhase_(async (manager) => {
      const subscriptionRequestRepository = manager.getRepository(SubscriptionRequest)
      const subscriptionRequest = subscriptionRequestRepository.create(data)
      return await subscriptionRequestRepository.save(subscriptionRequest)
    })
  }

  async findOne(
    where: FindOptionsWhere<SubscriptionRequest>,
    config?: Omit<FindConfig<SubscriptionRequest>, "where">
  ): Promise<SubscriptionRequest | null> {
    const manager = this.activeManager_
    const subscriptionRequestRepository = manager.getRepository(SubscriptionRequest)
    
    const subscriptionRequest = await subscriptionRequestRepository.findOne({
      where,
      ...config,
    })

    if (!subscriptionRequest) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Subscription request was not found`
      )
    }

    return subscriptionRequest
  }

  async confirm(token: string): Promise<SubscriptionRequest> {
    return this.atomicPhase_(async (manager) => {
      const subscriptionRequestRepository = manager.getRepository(SubscriptionRequest)
      
      const subscriptionRequest = await subscriptionRequestRepository.findOne({
        where: { token }
      })

      if (!subscriptionRequest) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          `Subscription request with token ${token} was not found`
        )
      }

      if (new Date() > subscriptionRequest.expires_at) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Subscription request with token ${token} has expired`
        )
      }

      subscriptionRequest.confirmed_at = new Date()
      await subscriptionRequestRepository.save(subscriptionRequest)

      return subscriptionRequest
    })
  }

  async delete(subscriptionRequestId: string): Promise<void> {
    return this.atomicPhase_(async (manager) => {
      const subscriptionRequestRepository = manager.getRepository(SubscriptionRequest)
      await subscriptionRequestRepository.delete(subscriptionRequestId)
    })
  }
}

export default SubscriptionRequestService