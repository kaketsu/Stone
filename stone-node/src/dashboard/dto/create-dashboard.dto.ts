import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateDashboardDto {
  @IsDate()
  @IsNotEmpty()
  openDate: Date;

  @IsNumber()
  tradingVolume: number;

  @IsNumber()
  limitUpCount1: number;

  @IsNumber()
  limitUpCount2: number;

  @IsNumber()
  limitUpCount3: number;

  @IsNumber()
  limitUpCountBeforeCallAuction: number;

  @IsNumber()
  limitDownCount1: number;

  @IsNumber()
  limitDownCount2: number;

  @IsNumber()
  limitDownCount3: number;

  @IsNumber()
  limitDownCountBeforeCallAuction: number;

  @IsNumber()
  redStockCount: number;

  @IsNumber()
  redStockRadio: number;

  @IsNumber()
  heat: number;

  // @IsString()
  // dashboardCode: string;

  // @IsBoolean()
  // mainSector: Sector;

  // @IsBoolean()
  // subSector: Sector;

  // @IsNotEmpty()
  // @MinLength(3, { message: 'Dashboardname must have atleast 3 characters.' })
  // @IsAlphanumeric(null, {
  //   message: 'Dashboardname does not allow other than alpha numeric chars.',
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