import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWaterReportAndSystemUser1757520000000
  implements MigrationInterface
{
  name = 'CreateWaterReportAndSystemUser1757520000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'WATER_REPORT',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'address', type: 'varchar', isNullable: false },
          { name: 'description', type: 'varchar', isNullable: false },
          { name: 'severity', type: 'varchar', isNullable: false },
          { name: 'reporter_phone', type: 'varchar', isNullable: false },
          { name: 'is_resolved', type: 'boolean', default: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'SYSTEM_USER',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
          { name: 'password', type: 'varchar', isNullable: false },
          { name: 'is_notification_enabled', type: 'boolean', default: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('SYSTEM_USER');
    await queryRunner.dropTable('WATER_REPORT');
  }
}