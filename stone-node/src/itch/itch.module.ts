import { Module } from '@nestjs/common';
import { ItchController } from './itch.controller';
import { ItchService } from './itch.service';

@Module({
  controllers: [ItchController],
  providers: [ItchService],
})
export class ItchModule {}
