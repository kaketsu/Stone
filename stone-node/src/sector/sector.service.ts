import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './entities/sector.entity';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  createSector(createSectorDto: CreateSectorDto) {
    const sector: Sector = new Sector();
    sector.sectorName = createSectorDto.sectorName;
    sector.sectorDesc = createSectorDto.sectorDesc;
    sector.isMain = createSectorDto.isMain;
    sector.isSub = createSectorDto.isSub;
    sector.mainSector = createSectorDto.mainSector;
    return this.sectorRepository.save(sector);
  }

  findAll(): Promise<Sector[]> {
    return this.sectorRepository.find();
  }

  findSector(sectorId: string): Promise<Sector> {
    return this.sectorRepository.findOneBy({ sectorId });
  }

  updateSector(id: number, updateSectorDto: UpdateSectorDto): Promise<Sector> {
    const sector: Sector = new Sector();
    sector.sectorName = updateSectorDto.sectorName;
    sector.sectorDesc = updateSectorDto.sectorDesc;
    sector.isMain = updateSectorDto.isMain;
    sector.isSub = updateSectorDto.isSub;
    sector.mainSector = updateSectorDto.mainSector;
    return this.sectorRepository.save(sector);
  }

  removeSector(sectorId: number): Promise<{ affected?: number }> {
    return this.sectorRepository.delete(sectorId);
  }

  // findAllByAuthor(authorId: string): Promise<Sector[]> {
  //   return this.sectorRepository.find({
  //     where: {
  //       author: {
  //         id: authorId,
  //       },
  //     },
  //   });
  // }

  // async postAuthor(postId: string) {
  //   const post = await this.sectorRepository.findOne({
  //     where: {
  //       id: postId,
  //     },
  //     relations: {
  //       author: true,
  //     },
  //   });

  //   return post.author;
  // }
}
