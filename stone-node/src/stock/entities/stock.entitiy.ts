import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Sector } from 'src/sector/entities/sector.entity';

@Entity()
@ObjectType()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  stockId: string;

  @Column()
  stockCode: string;

  @Column()
  stockName: string;

  @Column()
  mainSector: Sector;

  @Column()
  subSector: Sector;

  @Column({ default: true })
  isActive: boolean;
}
