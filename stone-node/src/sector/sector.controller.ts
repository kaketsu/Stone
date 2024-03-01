import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/sector
 */
@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Sector will be
   * POST http://localhost:3000/sector
   */
  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorService.createSector(createSectorDto);
  }

  /**
   * we have used get decorator to get all the sector's list
   * so the API URL will be
   * GET http://localhost:3000/sector
   */
  @Get()
  findAll() {
    return this.sectorService.findAll();
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/sector/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectorService.findSector(id);
  }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/sector/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorService.updateSector(+id, updateSectorDto);
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/sector/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectorService.removeSector(+id);
  }
}
