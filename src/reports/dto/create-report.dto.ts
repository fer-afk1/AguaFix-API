import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';
import { ReportSeverity } from '../entities/report.entity';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(['low', 'medium', 'high'])
  severity: ReportSeverity;

  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  reporterPhone: string;
}