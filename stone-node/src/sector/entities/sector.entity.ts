import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Stock } from '../../stock/entities/stock.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class Sector {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  sectorId: string;

  @Column()
  @Field()
  sectorName: string;

  @Column()
  @Field()
  sectorDesc: string;

  @Column()
  @Field()
  isMain: boolean;

  @Column()
  @Field()
  isSub: boolean;

  @ManyToOne(() => Sector, (post: Sector) => post.sectorId)
  @Field(() => Sector)
  mainSector: string;

  @OneToMany(() => Stock, (post: Stock) => post.stockName)
  @Field(() => [Stock])
  stocks: Stock[];
}
