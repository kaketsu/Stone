import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
// import { Author } from '../authors/entities/author.entity';
import { Dashboard } from './entities/dashboard.entity';
import { DashboardService } from './dashboard.service';

@Resolver(() => Dashboard)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @Query(() => Dashboard)
  async Dashboard() {
    const Dashboards = await this.dashboardService.findAll();
    return Dashboards.length > 0 ? Dashboards[0] : [];
  }

  // @Mutation(() => Dashboard)
  // createDashboard(
  //   @Args('title') title: string,
  //   @Args('authorId') authorId: string,
  // ) {
  //   return this.DashboardService.createDashboard(title, authorId);
  // }

  // @ResolveField(() => [Author])
  // author(@Parent() Dashboard: Dashboard) {
  //   return this.DashboardService.DashboardAuthor(Dashboard.id);
  // }
}
