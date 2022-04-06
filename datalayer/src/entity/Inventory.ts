import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    img: string

    @Column()
    details: string

    @Column()
    price: string
}