"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("../api/store/customers/password-token/route"));
exports.default = async ({ app }) => {
    // Register the password reset route
    app.use("/store/custom", route_1.default);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2FkZXJzL3JvdXRlcy1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx3RkFBOEU7QUFFOUUsa0JBQWUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFtQixFQUFFLEVBQUU7SUFDaEQsb0NBQW9DO0lBQ3BDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGVBQW1CLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUMifQ==