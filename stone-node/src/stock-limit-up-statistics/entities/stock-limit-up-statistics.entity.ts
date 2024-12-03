import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Sector } from 'src/sector/entities/sector.entity';

@Entity()
@ObjectType()
export class StockLimitUpStatistics {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  date: Date;

  @Column({ default: 0 })
  limitUpLevel1: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevel1Percentage: number;

  @Column({ default: 0 })
  limitUpLevel2: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevel2Percentage: number;

  @Column({ default: 0 })
  limitUpLevel3: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevel3Percentage: number;

  @Column({ default: 0 })
  limitUpLevel4: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevel4Percentage: number;

  @Column({ default: 0 })
  limitUpLevel5: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevel5Percentage: number;

  @Column({ default: 0 })
  limitUpLevel6: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevel6Percentage: number;

  @Column({ default: 0 })
  limitUpLevel7: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevel7Percentage: number;

  @Column({ default: 0 })
  limitUpLevel8: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevel8Percentage: number;

  @Column({ default: 0 })
  limitUpLevelMore: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 4 })
  limitUpLevelMorePercentage: number;
}
