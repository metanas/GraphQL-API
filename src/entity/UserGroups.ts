import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Permissions } from './Permissions';
import { User } from './User';

@Entity()
@ObjectType()
export class UserGroups extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  public id: number;

  @Column()
  @Field()
  public name: string;

  @Column({ type: 'jsonb' })
  @Field(() => Permissions)
  public permissions: Permissions;

  @OneToMany(() => User, user => user.id)
  public user: User[];
}
