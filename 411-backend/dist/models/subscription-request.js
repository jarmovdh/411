"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRequest = void 0;
const typeorm_1 = require("typeorm");
const medusa_1 = require("@medusajs/medusa");
const utils_1 = require("@medusajs/medusa/dist/utils");
let SubscriptionRequest = class SubscriptionRequest extends medusa_1.BaseEntity {
    beforeInsert() {
        this.id = (0, utils_1.generateEntityId)(this.id, "subreq");
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], SubscriptionRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], SubscriptionRequest.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], SubscriptionRequest.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], SubscriptionRequest.prototype, "expires_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionRequest.prototype, "beforeInsert", null);
SubscriptionRequest = __decorate([
    (0, typeorm_1.Entity)()
], SubscriptionRequest);
exports.SubscriptionRequest = SubscriptionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLXJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3N1YnNjcmlwdGlvbi1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFxRTtBQUNyRSw2Q0FBNkM7QUFDN0MsdURBQThEO0FBR3ZELElBQU0sbUJBQW1CLEdBQXpCLE1BQU0sbUJBQW9CLFNBQVEsbUJBQVU7SUFlekMsWUFBWTtRQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUEsd0JBQWdCLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0NBQ0YsQ0FBQTtBQWpCQztJQUFDLElBQUEsdUJBQWEsR0FBRTs7K0NBQ047QUFFVjtJQUFDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7a0RBQ2Y7QUFFYjtJQUFDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOztrREFDN0I7QUFFYjtJQUFDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzs4QkFDbEIsSUFBSTt1REFBQTtBQUdoQjtJQUFDLElBQUEsc0JBQVksR0FBRTs7Ozt1REFHZDtBQWpCVSxtQkFBbUI7SUFEL0IsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksbUJBQW1CLENBa0IvQjtBQWxCWSxrREFBbUIifQ==