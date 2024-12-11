"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("@medusajs/utils");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/store/subscription-requests", route);
    route.post("/confirm", (0, utils_1.wrapHandler)(async (req, res) => {
        const { token } = req.body;
        const subscriptionRequestService = req.scope.resolve("subscriptionRequestService");
        try {
            const subscription = await subscriptionRequestService.confirm(token);
            res.json({ email: subscription.email });
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }));
    return app;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvc3RvcmUvc3Vic2NyaXB0aW9uLXJlcXVlc3RzL2NvbmZpcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBZ0M7QUFDaEMsMkNBQTZDO0FBRTdDLE1BQU0sS0FBSyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFBO0FBRXRCLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUU5QyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFBLG1CQUFXLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNwRCxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUUxQixNQUFNLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUE7UUFFbEYsSUFBSTtZQUNGLE1BQU0sWUFBWSxHQUFHLE1BQU0sMEJBQTBCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3BFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDeEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1NBQ2pEO0lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVILE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQyxDQUFBIn0=