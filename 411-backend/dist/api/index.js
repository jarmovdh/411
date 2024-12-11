"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const subscription_requests_1 = __importDefault(require("./store/subscription-requests"));
const confirm_1 = __importDefault(require("./store/subscription-requests/confirm"));
const delete_1 = __importDefault(require("./store/customers/delete"));
exports.default = (container, config) => {
    const app = (0, express_1.Router)();
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    (0, confirm_1.default)(app);
    (0, subscription_requests_1.default)(app, config);
    const deleteRouter = (0, delete_1.default)(container);
    app.use("/store/customers", deleteRouter);
    return app;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLDhEQUFvQztBQUNwQywwRkFBeUU7QUFDekUsb0ZBQXVFO0FBRXZFLHNFQUEwRDtBQUcxRCxrQkFBZSxDQUFDLFNBQVMsRUFBRSxNQUFvQixFQUFFLEVBQUU7SUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUE7SUFFcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDbEQsSUFBQSxpQkFBbUIsRUFBQyxHQUFHLENBQUMsQ0FBQTtJQUN4QixJQUFBLCtCQUE2QixFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUUxQyxNQUFNLFlBQVksR0FBRyxJQUFBLGdCQUFtQixFQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFFekMsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDLENBQUEifQ==