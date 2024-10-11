import { IsNotEmpty, IsString, IsBoolean, MinLength } from 'class-validator';
import { Sector } from 'src/sector/entities/sector.entity';

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class UpdateStockDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  stockName: string;

  @IsString()
  stockCode: string;

  @IsBoolean()
  mainSector: Sector;

  @IsBoolean()
  subSector: Sector;
}
