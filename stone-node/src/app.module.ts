import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { HelloModule } from './hello/hello.module';
import { SectorModule } from './sector/sector.module';
import { StockModule } from './stock/stock.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ItchModule } from './itch/itch.module';
import { SectorTrendModule } from './sector-trend/sector-trend.module';
import { StockLimitUpModule } from './stock-limit-up/stock-limit-up.module';
import { StockLimitUpStatisticsModule } from './stock-limit-up-statistics/stock-limit-up-statistics.module';
import { TaskModule } from './task/task.module';
import { TradeDayModule } from './trade-day/trade-day.module';
@Module({
  imports: [
    HelloModule,
    SectorModule,
    StockModule,
    DashboardModule,
    ItchModule,
    StockLimitUpModule,
    StockLimitUpStatisticsModule,
    SectorTrendModule,
    TaskModule,
    TradeDayModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql@2009',
      database: 'stone',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 设置为 true 可以自动创建数据库表（仅用于开发环境）
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [
        HelloModule,
        SectorModule,
        StockModule,
        DashboardModule,
        StockLimitUpModule,
        StockLimitUpStatisticsModule,
      ],
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
