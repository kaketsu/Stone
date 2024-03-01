import { IsNotEmpty, IsString, IsBoolean, MinLength } from 'class-validator';

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateSectorDto {
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

  // @IsNotEmpty()
  // @MinLength(3, { message: 'Sectorname must have atleast 3 characters.' })
  // @IsAlphanumeric(null, {
  //   message: 'Sectorname does not allow other than alpha numeric chars.',
  // })
  // username: string;

  // @IsNotEmpty()
  // @IsEmail(null, { message: 'Please provide valid Email.' })
  // email: string;

  // @IsInt()
  // age: number;

  // @IsString()
  // @IsEnum(['f', 'm', 'u'])
  // gender: string;

  // @IsNotEmpty()
  // @Matches(passwordRegEx, {
  //   message: `Password must contain Minimum 8 and maximum 20 characters,
  //   at least one uppercase letter,
  //   one lowercase letter,
  //   one number and
  //   one special character`,
  // })
  // password: string;
}
