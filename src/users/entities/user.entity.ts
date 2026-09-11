import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('SYSTEM_USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ name: 'is_notification_enabled', type: 'boolean', default: true })
  isNotificationEnabled: boolean;
}