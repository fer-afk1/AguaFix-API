import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { envs } from '../config/envs';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: envs.awsRegion,
      credentials: {
        accessKeyId: envs.awsAccessKeyId,
        secretAccessKey: envs.awsSecretAccessKey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const prefix = folder.replace(/^\/+|\/+$/g, '');
    const key = `${prefix ? prefix + '/' : ''}${randomUUID()}${extname(file.originalname).toLowerCase()}`;

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: envs.awsS3Bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
    } catch (error) {
      this.logger.error(`No se pudo subir ${key} a S3`, error as Error);
      throw new InternalServerErrorException('No se pudo guardar la foto');
    }

    return `https://${envs.awsS3Bucket}.s3.${envs.awsRegion}.amazonaws.com/${key}`;
  }
}