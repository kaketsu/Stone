import { IsNotEmpty, IsString, IsBoolean, MinLength } from 'class-validator';

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class UpdateSectorDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  sectorName: string;

  @IsString()
  sectorDesc: string;

  @IsBoolean()
  isMain: boolean;

  @IsBoolean()
  isSub: boolean;

  @IsString()
  mainSector: string;
}
