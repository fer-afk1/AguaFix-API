import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '../repositories/reports.repository';
import { CreateReportDto } from '../dto/create-report.dto';
import { Report } from '../entities/report.entity';
import { EmailService } from '../../email/email.service';
import { generateReportTemplate } from '../templates/report.template';
import { envs } from '../../config/envs';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateReportDto): Promise<Report> {
    const report = this.reportsRepository.create(dto);
    const savedReport = await this.reportsRepository.save(report);

    const html = generateReportTemplate(dto);
    await this.emailService.sendEmail(
      envs.maintenanceCrewEmail,
      `Nuevo reporte de fuga de agua - ${dto.address}`,
      html,
    );

    return savedReport;
  }

  async findAll(): Promise<Report[]> {
    return this.reportsRepository.findAll();
  }
}