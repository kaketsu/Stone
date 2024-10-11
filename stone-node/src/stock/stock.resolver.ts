import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
// import { Author } from '../authors/entities/author.entity';
import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';

@Resolver(() => Stock)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Query(() => Stock)
  async Stock() {
    const Stocks = await this.stockService.findAll();
    return Stocks.length > 0 ? Stocks[0] : [];
  }

  // @Mutation(() => Stock)
  // createStock(
  //   @Args('title') title: string,
  //   @Args('authorId') authorId: string,
  // ) {
  //   return this.StockService.createStock(title, authorId);
  // }

  // @ResolveField(() => [Author])
  // author(@Parent() Stock: Stock) {
  //   return this.StockService.StockAuthor(Stock.id);
  // }
}
