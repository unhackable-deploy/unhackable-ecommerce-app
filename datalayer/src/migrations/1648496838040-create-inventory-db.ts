import { MigrationInterface } from "typeorm"
import { QueryRunner } from "typeorm"


export class CreateInventory1648496838040 implements MigrationInterface {
                       
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE inventory (
            id SERIAL PRIMARY KEY,
            title character varying(255) NOT NULL,
            img character varying(255) NOT NULL,
            details text NOT NULL,
            price character varying(255) NOT NULL,
            created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
        )`);

        await queryRunner.query(`INSERT INTO inventory (id, title, img, details, price) VALUES 
            (1, 'The Key', 'key.png', 'This key is treuly The Key, the one and only key you will ever need.', '$0.99'),
            (2, 'The Lock', 'lock.png', 'The Lock is a lock like no other, it keeps things safe for sure', '$9.99'),
            (3, 'The Fancy Lock', 'lock-fancy.png', 'When you need to lock something in style there is The Fancy Lock.', '$39.99'),
            (4, 'The Safe', 'safe.png', 'When you need to store things safely use The Safe.', '$999.99')`);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE inventory");
    }
}