import { Query, Resolver } from '@nestjs/graphql';
import { Hello } from './models/hello.model';

@Resolver(() => Hello)
export class HelloResolver {
  @Query(() => Hello)
  hello(): Hello {
    return { world: 'Hello, world' };
  }
}
