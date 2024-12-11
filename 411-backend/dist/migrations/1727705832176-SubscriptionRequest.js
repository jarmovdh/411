"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRequest1727705832176 = void 0;
class SubscriptionRequest1727705832176 {
    constructor() {
        this.name = 'SubscriptionRequest1727705832176';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "subscription_request" (
            "id" character varying NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "email" character varying NOT NULL, 
            "token" character varying NOT NULL, 
            "expires_at" TIMESTAMP NOT NULL, 
            CONSTRAINT "UQ_subscription_request_token" UNIQUE ("token"),
            CONSTRAINT "PK_subscription_request" PRIMARY KEY ("id")
          )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "subscription_request"`);
    }
}
exports.SubscriptionRequest1727705832176 = SubscriptionRequest1727705832176;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTcyNzcwNTgzMjE3Ni1TdWJzY3JpcHRpb25SZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZ3JhdGlvbnMvMTcyNzcwNTgzMjE3Ni1TdWJzY3JpcHRpb25SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsZ0NBQWdDO0lBQTdDO1FBQ0ksU0FBSSxHQUFHLGtDQUFrQyxDQUFBO0lBbUI3QyxDQUFDO0lBakJVLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBd0I7UUFDcEMsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDOzs7Ozs7Ozs7WUFTcEIsQ0FBQyxDQUFBO0lBQ1QsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBd0I7UUFDdEMsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUE7SUFDaEUsQ0FBQztDQUVKO0FBcEJELDRFQW9CQyJ9