import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base-entity';
import { Role } from '../../roles/entities/role.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(data?: any) {
    super(data);
  }

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  salt: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  phone?: string;

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
