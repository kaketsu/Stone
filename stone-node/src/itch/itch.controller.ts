import { Controller, Get } from '@nestjs/common';
import { ItchService } from './itch.service';
@Controller('itch')
export class ItchController {
  constructor(private readonly itchService: ItchService) {}

  @Get()
  findAll() {
    return this.itchService.startPuppeteer();
  }
}
