import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export type ReportSeverity = 'low' | 'medium' | 'high';

@Entity('WATER_REPORT')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  severity: ReportSeverity;

  @Column({ name: 'reporter_phone', type: 'varchar' })
  reporterPhone: string;

  @Column({ name: 'is_resolved', type: 'boolean', default: false })
  isResolved: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}