import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base-entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  constructor(data?: any) {
    super(data);
  }

  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  users: User[];
}
