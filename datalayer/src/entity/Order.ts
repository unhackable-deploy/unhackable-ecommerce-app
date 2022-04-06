import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    details: string
}