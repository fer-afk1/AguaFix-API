import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPhotoUrlToWaterReport1792800000000
  implements MigrationInterface
{
  name = 'AddPhotoUrlToWaterReport1792800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'WATER_REPORT',
      new TableColumn({
        name: 'photo_url',
        type: 'varchar',
        isNullable: false,
        default: "''",
      }),
    );

    await queryRunner.addColumn(
      'WATER_REPORT',
      new TableColumn({
        name: 'repair_photo_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('WATER_REPORT', 'repair_photo_url');
    await queryRunner.dropColumn('WATER_REPORT', 'photo_url');
  }
}