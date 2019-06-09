import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { UserTokens } from './UserTokens';
import { UserGroups } from './UserGroups';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public firstName: string;

  @Field()
  @Column()
  public lastName: string;

  @Field()
  @Column('text', { unique: true })
  public email: string;

  @Field()
  public get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column()
  public password: string;

  @OneToMany(() => UserTokens, token => token.user)
  public tokens: UserTokens[];

  @ManyToOne(() => UserGroups, permission => permission.id)
  @JoinTable()
  public permissions: UserGroups;
}
