import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  protected constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Index()
  createdAt: Date = new Date();

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Index()
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @Column({
    nullable: true,
  })
  createdBy?: number;

  @Column({
    nullable: true,
  })
  updatedBy?: number;

  @Column({
    nullable: true,
  })
  deletedBy?: number;
}
