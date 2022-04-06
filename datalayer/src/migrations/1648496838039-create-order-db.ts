import { MigrationInterface } from "typeorm"
import { QueryRunner } from "typeorm"

export class CreateOrder1648496838039 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE orders ( 
            id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            details VARCHAR(255) NOT NULL, 
            created_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
            updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP)`);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE order");
    }
}