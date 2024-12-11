"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medusa_js_1 = __importDefault(require("@medusajs/medusa-js"));
const route = (0, express_1.Router)();
route.post('/store/customers/password-token', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const medusa = new medusa_js_1.default({ baseUrl: process.env.MEDUSA_BACKEND_URL, maxRetries: 3 });
    try {
        await medusa.customers.generatePasswordToken({ email });
        res.status(200).json({ message: 'Password reset token generated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to generate password reset token', error: error.message });
    }
});
exports.default = (app) => {
    app.use('/store', route);
    return app;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2N1c3RvbWVycy9wYXNzd29yZC10b2tlbi9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFpQztBQUNqQyxvRUFBeUM7QUFFekMsTUFBTSxLQUFLLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFFdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQy9ELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRTNCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQztLQUMvRDtJQUVELE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXRGLElBQUk7UUFDRixNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLDZDQUE2QyxFQUFFLENBQUMsQ0FBQztLQUNsRjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUseUNBQXlDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3BHO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDIn0=