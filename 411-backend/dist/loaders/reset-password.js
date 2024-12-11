"use strict";
// src/loaders/reset-password.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reset_password_1 = __importDefault(require("../subscribers/reset-password"));
const reset_password_2 = __importDefault(require("../services/reset-password"));
exports.default = async (container, config) => {
    container.register({
        resetPasswordService: reset_password_2.default,
    });
    container.addSubscriber(reset_password_1.default);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9hZGVycy9yZXNldC1wYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0NBQWdDOzs7OztBQUVoQyxtRkFBbUU7QUFDbkUsZ0ZBQTZEO0FBRTdELGtCQUFlLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDekMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNqQixvQkFBb0IsRUFBRSx3QkFBb0I7S0FDM0MsQ0FBQyxDQUFBO0lBRUYsU0FBUyxDQUFDLGFBQWEsQ0FBQyx3QkFBdUIsQ0FBQyxDQUFBO0FBQ2xELENBQUMsQ0FBQSJ9