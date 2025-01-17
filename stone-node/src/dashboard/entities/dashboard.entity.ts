import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Sector } from 'src/sector/entities/sector.entity';

@Entity()
@ObjectType()
export class Dashboard {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  date: Date;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  tradingVolume: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  tradingVolume1: number; //上

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  tradingVolume2: number; //深

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  tradingVolume3: number; //创

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  tradingVolume4: number; //北

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  percentageChange1: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  percentageChange2: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  percentageChange3: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  percentageChange4: number;

  @Column({ default: 0 })
  limitUpCount: number;

  @Column({ default: 0 })
  limitUpCount1: number;

  @Column({ default: 0 })
  limitUpCount2: number;

  @Column({ default: 0 })
  limitUpCount3: number;

  @Column({ default: 0 })
  limitUpCountBeforeCallAuction: number;

  @Column({ default: 0 })
  limitDownCount: number;

  @Column({ default: 0 })
  limitDownCount1: number;

  @Column({ default: 0 })
  limitDownCount2: number;

  @Column({ default: 0 })
  limitDownCount3: number;

  @Column({ default: 0 })
  limitDownCountBeforeCallAuction: number;

  @Column({ default: 0 })
  redStockCount: number;

  // 如何用上面的来做一个加权heat
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  heat: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  limitUpIndex: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  sentimentIndex: number;

  // 总封单金额
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  allLockUpAmount: number;

  // 0~3 个数  1分
  // 3-6     2分
  // 6-9     3分
  // 10
  // 10-13
  // 13-16
  // 16-19
  // 10
}
