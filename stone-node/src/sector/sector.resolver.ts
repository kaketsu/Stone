import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
// import { Author } from '../authors/entities/author.entity';
import { Sector } from './entities/sector.entity';
import { SectorService } from './sector.service';

@Resolver(() => Sector)
export class SectorResolver {
  constructor(private readonly sectorService: SectorService) {}

  @Query(() => Sector)
  async Sector() {
    // return { world: 'Hello, world' };
    const Sectors = await this.sectorService.findAll();
    return Sectors.length > 0 ? Sectors : [];
  }

  // @Mutation(() => Sector)
  // createSector(
  //   @Args('title') title: string,
  //   @Args('authorId') authorId: string,
  // ) {
  //   return this.SectorService.createSector(title, authorId);
  // }

  // @ResolveField(() => [Author])
  // author(@Parent() Sector: Sector) {
  //   return this.SectorService.SectorAuthor(Sector.id);
  // }
}
