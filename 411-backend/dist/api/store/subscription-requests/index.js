"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("@medusajs/utils");
const crypto_1 = __importDefault(require("crypto"));
const generateUniqueToken = () => {
    // Generate 32 random bytes
    const randomBytes = crypto_1.default.randomBytes(32);
    // Convert the random bytes to a hexadecimal string
    const token = randomBytes.toString("hex");
    return token;
};
const route = (0, express_1.Router)();
exports.default = (app, options) => {
    var _a;
    const { projectConfig } = options;
    const corsOptions = {
        origin: ((_a = projectConfig.store_cors) === null || _a === void 0 ? void 0 : _a.split(",")) || [],
        credentials: true,
    };
    app.use("/store", route);
    route.options("/subscription-requests", (0, cors_1.default)(corsOptions));
    route.post("/subscription-requests", (0, cors_1.default)(corsOptions), (0, utils_1.wrapHandler)(async (req, res) => {
        const subscriptionRequestService = req.scope.resolve("subscriptionRequestService");
        const { email } = req.body;
        if (!email) {
            res.status(400).json({
                message: "Email is required",
            });
            return;
        }
        try {
            const token = generateUniqueToken();
            const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
            const subscriptionRequest = await subscriptionRequestService.create({
                email,
                token,
                expires_at,
            });
            res.json({
                subscription_request: subscriptionRequest,
                token,
            });
        }
        catch (error) {
            console.error("Error creating subscription request:", error);
            res.status(500).json({
                message: "An error occurred while processing your request",
                error: error.message,
            });
        }
    }));
    return app;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL3N1YnNjcmlwdGlvbi1yZXF1ZXN0cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFnQztBQUNoQyxnREFBdUI7QUFDdkIsMkNBQTZDO0FBRTdDLG9EQUE0QjtBQUU1QixNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRTtJQUUvQiwyQkFBMkI7SUFDM0IsTUFBTSxXQUFXLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFMUMsbURBQW1EO0lBQ25ELE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFekMsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUE7QUFJRCxNQUFNLEtBQUssR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQTtBQUV0QixrQkFBZSxDQUFDLEdBQVcsRUFBRSxPQUFxQixFQUFFLEVBQUU7O0lBQ3BELE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFFakMsTUFBTSxXQUFXLEdBQUc7UUFDbEIsTUFBTSxFQUFFLENBQUEsTUFBQSxhQUFhLENBQUMsVUFBVSwwQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUksRUFBRTtRQUNsRCxXQUFXLEVBQUUsSUFBSTtLQUNsQixDQUFBO0lBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxJQUFBLGNBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQzFELEtBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBQSxjQUFJLEVBQUMsV0FBVyxDQUFDLEVBQUUsSUFBQSxtQkFBVyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDckYsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBRWxGLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBRTFCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsT0FBTyxFQUFFLG1CQUFtQjthQUM3QixDQUFDLENBQUE7WUFDRixPQUFNO1NBQ1A7UUFFRCxJQUFJO1lBQ0YsTUFBTSxLQUFLLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQTtZQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQyxvQkFBb0I7WUFFbEYsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLDBCQUEwQixDQUFDLE1BQU0sQ0FBQztnQkFDbEUsS0FBSztnQkFDTCxLQUFLO2dCQUNMLFVBQVU7YUFDWCxDQUFDLENBQUE7WUFFRixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNQLG9CQUFvQixFQUFFLG1CQUFtQjtnQkFDekMsS0FBSzthQUNOLENBQUMsQ0FBQTtTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQzVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixPQUFPLEVBQUUsaURBQWlEO2dCQUMxRCxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDckIsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRUgsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==