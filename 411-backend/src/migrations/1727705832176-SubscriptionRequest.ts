import { MigrationInterface, QueryRunner } from "typeorm";

export class SubscriptionRequest1727705832176 implements MigrationInterface {
    name = 'SubscriptionRequest1727705832176'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription_request" (
            "id" character varying NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "email" character varying NOT NULL, 
            "token" character varying NOT NULL, 
            "expires_at" TIMESTAMP NOT NULL, 
            CONSTRAINT "UQ_subscription_request_token" UNIQUE ("token"),
            CONSTRAINT "PK_subscription_request" PRIMARY KEY ("id")
          )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscription_request"`)
    }

}
