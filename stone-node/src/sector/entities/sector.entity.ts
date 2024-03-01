import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Stock } from '../../stock/entities/stock.entitiy';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column({ default: '' })
  @Field()
  mainSector: string;

  // @Column({ default: true })
  // @Field()
  // isActive: boolean;

  // @OneToMany(() => Stock, (post) => post.stockName)
  // @Field(() => [Stock])
  // stocks: Stock[];
}
