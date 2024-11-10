import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Sector } from 'src/sector/entities/sector.entity';

@Entity()
@ObjectType()
export class SectorTrend {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  openDate: Date;

  @Column()
  tradingVolume: number;

  @Column()
  limitUpCount1: number;

  @Column()
  limitUpCount2: number;

  @Column()
  limitUpCount3: number;

  @Column()
  limitUpCountBeforeCallAuction: number;

  @Column()
  limitDownCount1: number;

  @Column()
  limitDownCount2: number;

  @Column()
  limitDownCount3: number;

  @Column()
  limitDownCountBeforeCallAuction: number;

  @Column()
  redStockCount: number;

  // 如何用上面的来做一个加权heat
  @Column()
  heat: number;
}
