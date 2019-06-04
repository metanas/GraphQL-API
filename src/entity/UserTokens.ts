import { Column, ManyToOne, Entity, BaseEntity, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { User } from './User';

@Entity()
export class UserTokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public token: string;

  @Column({ type: 'timestamp', nullable: true })
  public expired_at: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinTable()
  public user: User;

  @Column()
  public create_at: Date;

  @Column({ nullable: true })
  public update_at: Date;
}
