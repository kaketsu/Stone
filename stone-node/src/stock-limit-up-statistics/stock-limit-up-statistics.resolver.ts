import { Query, Resolver } from '@nestjs/graphql';
import { StockLimitUpStatistics } from './entities/stock-limit-up-statistics.entity';
import { StockLimitUpStatisticsService } from './stock-limit-up-statistics.service';

@Resolver(() => StockLimitUpStatistics)
export class StockLimitUpStatisticsResolver {
  constructor(private readonly stockService: StockLimitUpStatisticsService) {}

  @Query(() => StockLimitUpStatistics)
  async StockLimitUpStatistics() {
    // const StockLimitUps = await this.stockService.findAll();
    // return StockLimitUps.length > 0 ? StockLimitUps[0] : [];
  }

  // @Mutation(() => StockLimitUp)
  // createStockLimitUp(
  //   @Args('title') title: string,
  //   @Args('authorId') authorId: string,
  // ) {
  //   return this.StockLimitUpService.createStockLimitUp(title, authorId);
  // }

  // @ResolveField(() => [Author])
  // author(@Parent() StockLimitUp: StockLimitUp) {
  //   return this.StockLimitUpService.StockLimitUpAuthor(StockLimitUp.id);
  // }

  // 开板，该如何抉择啊
  // 总算到了这个时候了
}
