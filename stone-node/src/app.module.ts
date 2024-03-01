import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { HelloModule } from './hello/hello.module';
import { SectorModule } from './sector/sector.module';
@Module({
  imports: [
    HelloModule,
    SectorModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'kaketsu',
    //   database: 'stone',
    //   entities: [__dirname + '/**/*.entities{.ts,.js}'],
    //   synchronize: true, // 设置为 true 可以自动创建数据库表（仅用于开发环境）
    // }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kaketsu',
      password: 'kaketsu',
      database: 'stone',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 设置为 true 可以自动创建数据库表（仅用于开发环境）
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [HelloModule],
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // autoSchemaFile: true,
      sortSchema: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      // buildSchemaOptions: {
      //   directives: [
      //     new GraphQLDirective({
      //       name: 'upper',
      //       locations: [DirectiveLocation.FIELD_DEFINITION],
      //     }),
      //   ],
      // },
    }),
  ],
})
export class AppModule {}