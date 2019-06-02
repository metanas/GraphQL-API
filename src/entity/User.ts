import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

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
}
