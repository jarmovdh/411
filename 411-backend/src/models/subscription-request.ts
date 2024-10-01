import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class SubscriptionRequest extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column({ type: "varchar" })
  email: string

  @Column({ type: "varchar", unique: true })
  token: string

  @Column({ type: "timestamp" })
  expires_at: Date
  confirmed_at: Date

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "subreq")
  }
}