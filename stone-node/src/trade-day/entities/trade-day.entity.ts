import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class TradeDay {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column()
  date: Date;

  @Column('date', { nullable: true })
  previousTradeDate: Date | null;

  @Column({ default: true })
  isTradeDay: boolean;
}
