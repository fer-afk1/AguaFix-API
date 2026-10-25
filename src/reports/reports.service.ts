import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportsRepository } from './repositories/reports.repository';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}

  async create(
    dto: CreateReportDto,
    photo?: Express.Multer.File,
  ): Promise<Report> {
    if (!photo) {
      throw new BadRequestException(
        'La foto de la fuga es obligatoria (campo "photo")',
      );
    }

    const photoUrl = await this.storageService.uploadFile(photo, 'reports/');

    const report = this.reportsRepository.create({ ...dto, photoUrl });
    const savedReport = await this.reportsRepository.save(report);

    const html = generateReportTemplate(dto, photoUrl);
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