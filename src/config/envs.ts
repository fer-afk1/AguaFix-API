import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  port: env.get('PORT').default(3000).asPortNumber(),

  // Base de datos
  dbHost: env.get('DB_HOST').required().asString(),
  dbPort: env.get('DB_PORT').required().asPortNumber(),
  dbUsername: env.get('DB_USERNAME').required().asString(),
  dbPassword: env.get('DB_PASSWORD').required().asString(),
  dbName: env.get('DB_NAME').required().asString(),

  // Correo
  mailHost: env.get('MAIL_HOST').required().asString(),
  mailPort: env.get('MAIL_PORT').required().asPortNumber(),
  mailSecure: env.get('MAIL_SECURE').default('false').asBool(),
  mailUser: env.get('MAIL_USER').required().asString(),
  mailPassword: env.get('MAIL_PASSWORD').required().asString(),
  mailFrom: env.get('MAIL_FROM').required().asString(),

  // Cuadrilla de mantenimiento
  maintenanceCrewEmail: env.get('MAINTENANCE_CREW_EMAIL').required().asString(),
  awsRegion: env.get('AWS_REGION').required().asString(),
  awsAccessKeyId: env.get('AWS_ACCESS_KEY_ID').required().asString(),
  awsSecretAccessKey: env.get('AWS_SECRET_ACCESS_KEY').required().asString(),
  awsS3Bucket: env.get('AWS_S3_BUCKET').required().asString(),
};