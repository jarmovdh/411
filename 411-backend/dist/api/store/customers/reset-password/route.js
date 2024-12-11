"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medusa_js_1 = __importDefault(require("@medusajs/medusa-js"));
const route = (0, express_1.Router)();
route.post('/store/customers/reset-password', async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).json({ message: "Token and password are required" });
    }
    const medusa = new medusa_js_1.default({ baseUrl: process.env.MEDUSA_BACKEND_URL, maxRetries: 3 });
    try {
        await medusa.customers.resetPassword({
            token,
            password,
            email: ''
        });
        res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to reset password', error: error.message });
    }
});
exports.default = (app) => {
    app.use('/store', route);
    return app;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2N1c3RvbWVycy9yZXNldC1wYXNzd29yZC9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFpQztBQUNqQyxvRUFBeUM7QUFFekMsTUFBTSxLQUFLLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFFdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQy9ELE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUVyQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDO0tBQzdFO0lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxtQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFdEYsSUFBSTtRQUNGLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDbkMsS0FBSztZQUNMLFFBQVE7WUFDUixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLENBQUMsQ0FBQztLQUNsRTtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3JGO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDIn0=