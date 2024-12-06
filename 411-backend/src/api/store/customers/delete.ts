import { Router } from "express"
import { faker } from '@faker-js/faker'
import { CustomerService, MedusaContainer, OrderService } from "@medusajs/medusa"

export default (container: MedusaContainer) => {
  const route = Router()

  const hasCustomerRelations = async (
    customerId: string,
    orderService: OrderService
  ): Promise<boolean> => {
    try {
      const [orders, count] = await orderService.listAndCount({
        customer_id: customerId,
      })
      return count > 0
    } catch (error) {
      throw error
    }
  }

  const anonymizeCustomerData = async (
    customerId: string, 
    customerService: CustomerService
  ) => {
    try {
      // Only include fields that are in UpdateCustomerInput
      const anonymizedData = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        metadata: {
          anonymized: true,
          anonymized_at: new Date().toISOString(),
          original_email_domain: null,
          account_disabled: true
        }
      }

      // Update the customer with anonymized data
      await customerService.update(customerId, anonymizedData)

    } catch (error) {
      console.error("Error anonymizing customer:", error)
      throw error
    }
  }

  route.delete("/:id", async (req, res) => {
    try {
      console.log("Delete request received for customer:", req.params.id)
      
      const customerService: CustomerService = req.scope.resolve("customerService")
      const orderService: OrderService = req.scope.resolve("orderService")
      
      
  
      const { id } = req.params
  
      console.log("Retrieving customer...")
      const customer = await customerService.retrieve(id)
      if (!customer) {
        console.log("Customer not found:", id)
        return res.status(404).json({ message: "Customer not found" })
      }
      console.log("Customer found:", customer.id)
  
      // Check for any relations
      console.log("Checking customer relations...")
      const hasRelations = await hasCustomerRelations(id, orderService)
      console.log(`Customer ${id} has relations: ${hasRelations}`)
  
      if (hasRelations) {
        console.log("Anonymizing customer data...")
        await anonymizeCustomerData(id, customerService)
        console.log("Customer data anonymized successfully")
        return res.status(200).json({ 
          message: "Customer data anonymized successfully",
          type: "anonymized"
        })
      } else {
        console.log("Deleting customer...")
        await customerService.delete(id)
        console.log("Customer deleted successfully")
        return res.status(200).json({ 
          message: "Customer deleted successfully",
          type: "deleted"
        })
      }
    } catch (error) {
      console.error("Delete customer error:", error)
      console.error("Error stack:", error.stack)
      return res.status(500).json({
        message: "Failed to process customer deletion",
        error: error.message,
      })
    }
  })

  return route
}