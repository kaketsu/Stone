import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Sector } from 'src/sector/entities/sector.entity';

@Entity()
@ObjectType()
export class StockLimitUp {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  date: Date;

  @Column()
  stockCode: string;

  @Column()
  stockName: string;

  @Column({ default: false })
  isCeilingLimitUp: boolean;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  turnoverRate: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  tradingVolume: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  totalMarketValue: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  lockUpFunds: number;

  @Column({ default: 1 })
  limitUpLevel: number;

  // @ManyToOne(() => Sector, (post: Sector) => post.sectorId)
  // @Column()
  // mainSector: string;

  // // @ManyToOne(() => Sector, (post: Sector) => post.sectorId)
  // @Column()
  // subSector: string;

  // @Column({ default: true })
  // isActive: boolean;
}
