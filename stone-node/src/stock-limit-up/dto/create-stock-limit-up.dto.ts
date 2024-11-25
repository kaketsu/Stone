import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsDate,
  IsNumber,
} from 'class-validator';

// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateStockLimitUpDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  stockName: string;

  @IsString()
  stockCode: string;

  @IsNumber()
  isCeilingLimitUp: boolean;

  @IsNumber()
  turnoverRate: number;

  @IsNumber()
  tradingVolume: number;

  @IsNumber()
  lockUpFunds: number;

  @IsNumber()
  continuousLimitUpNumber: number;

  // @IsBoolean()
  // mainSector: Sector;

  // @IsBoolean()
  // subSector: Sector;

  // @IsNotEmpty()
  // @MinLength(3, { message: 'StockLimitUpname must have atleast 3 characters.' })
  // @IsAlphanumeric(null, {
  //   message: 'StockLimitUpname does not allow other than alpha numeric chars.',
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
