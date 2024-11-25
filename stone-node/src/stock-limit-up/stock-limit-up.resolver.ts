import { Query, Resolver } from '@nestjs/graphql';
// import { Author } from '../authors/entities/author.entity';
import { StockLimitUp } from './entities/stock-limit-up.entity';
import { StockLimitUpService } from './stock-limit-up.service';

@Resolver(() => StockLimitUp)
export class StockLimitUpResolver {
  constructor(private readonly stockService: StockLimitUpService) {}

  @Query(() => StockLimitUp)
  async StockLimitUp() {
    const StockLimitUps = await this.stockService.findAll();
    return StockLimitUps.length > 0 ? StockLimitUps[0] : [];
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
