"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faker_1 = require("@faker-js/faker");
exports.default = (container) => {
    const route = (0, express_1.Router)();
    const hasCustomerRelations = async (customerId, orderService) => {
        try {
            const [orders, count] = await orderService.listAndCount({
                customer_id: customerId,
            });
            return count > 0;
        }
        catch (error) {
            throw error;
        }
    };
    const anonymizeCustomerData = async (customerId, customerService) => {
        try {
            // Only include fields that are in UpdateCustomerInput
            const anonymizedData = {
                first_name: faker_1.faker.person.firstName(),
                last_name: faker_1.faker.person.lastName(),
                email: faker_1.faker.internet.email(),
                phone: faker_1.faker.phone.number(),
                metadata: {
                    anonymized: true,
                    anonymized_at: new Date().toISOString(),
                    original_email_domain: null,
                    account_disabled: true
                }
            };
            // Update the customer with anonymized data
            await customerService.update(customerId, anonymizedData);
        }
        catch (error) {
            console.error("Error anonymizing customer:", error);
            throw error;
        }
    };
    route.delete("/:id", async (req, res) => {
        try {
            console.log("Delete request received for customer:", req.params.id);
            const customerService = req.scope.resolve("customerService");
            const orderService = req.scope.resolve("orderService");
            const { id } = req.params;
            console.log("Retrieving customer...");
            const customer = await customerService.retrieve(id);
            if (!customer) {
                console.log("Customer not found:", id);
                return res.status(404).json({ message: "Customer not found" });
            }
            console.log("Customer found:", customer.id);
            // Check for any relations
            console.log("Checking customer relations...");
            const hasRelations = await hasCustomerRelations(id, orderService);
            console.log(`Customer ${id} has relations: ${hasRelations}`);
            if (hasRelations) {
                console.log("Anonymizing customer data...");
                await anonymizeCustomerData(id, customerService);
                console.log("Customer data anonymized successfully");
                return res.status(200).json({
                    message: "Customer data anonymized successfully",
                    type: "anonymized"
                });
            }
            else {
                console.log("Deleting customer...");
                await customerService.delete(id);
                console.log("Customer deleted successfully");
                return res.status(200).json({
                    message: "Customer deleted successfully",
                    type: "deleted"
                });
            }
        }
        catch (error) {
            console.error("Delete customer error:", error);
            console.error("Error stack:", error.stack);
            return res.status(500).json({
                message: "Failed to process customer deletion",
                error: error.message,
            });
        }
    });
    return route;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9zdG9yZS9jdXN0b21lcnMvZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWdDO0FBQ2hDLDJDQUF1QztBQUd2QyxrQkFBZSxDQUFDLFNBQTBCLEVBQUUsRUFBRTtJQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQTtJQUV0QixNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDaEMsVUFBa0IsRUFDbEIsWUFBMEIsRUFDUixFQUFFO1FBQ3BCLElBQUk7WUFDRixNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDdEQsV0FBVyxFQUFFLFVBQVU7YUFDeEIsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1NBQ2pCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLEtBQUssQ0FBQTtTQUNaO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQ2pDLFVBQWtCLEVBQ2xCLGVBQWdDLEVBQ2hDLEVBQUU7UUFDRixJQUFJO1lBQ0Ysc0RBQXNEO1lBQ3RELE1BQU0sY0FBYyxHQUFHO2dCQUNyQixVQUFVLEVBQUUsYUFBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BDLFNBQVMsRUFBRSxhQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDbEMsS0FBSyxFQUFFLGFBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUM3QixLQUFLLEVBQUUsYUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLFFBQVEsRUFBRTtvQkFDUixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsYUFBYSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO29CQUN2QyxxQkFBcUIsRUFB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