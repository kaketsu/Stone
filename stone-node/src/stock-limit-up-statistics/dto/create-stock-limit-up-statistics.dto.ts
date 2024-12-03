import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateStockLimitUpStatisticsDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  limitUpLevel1: number;

  @IsNumber()
  limitUpLevel2: number;

  @IsNumber()
  limitUpLevel2Percentage: number;

  @IsNumber()
  limitUpLevel3: number;

  @IsNumber()
  limitUpLevel3Percentage: number;

  @IsNumber()
  limitUpLevel4: number;

  @IsNumber()
  limitUpLevel4Percentage: number;

  @IsNumber()
  limitUpLevel5: number;

  @IsNumber()
  limitUpLevel5Percentage: number;

  @IsNumber()
  limitUpLevel6: number;

  @IsNumber()
  limitUpLevel6Percentage: number;

  @IsNumber()
  limitUpLevel7: number;

  @IsNumber()
  limitUpLevel7Percentage: number;

  @IsNumber()
  limitUpLevel8: number;

  @IsNumber()
  limitUpLevel8Percentage: number;

  @IsNumber()
  limitUpLevelMore: number;

  @IsNumber()
  limitUpLevelMorePercentage: number;
}
