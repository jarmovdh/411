import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SubscriptionRequest1727705832176 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
