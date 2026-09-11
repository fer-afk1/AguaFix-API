import { CreateReportDto } from '../dto/create-report.dto';

const SEVERITY_LABELS: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

const SEVERITY_COLORS: Record<string, string> = {
  low: '#2e7d32',
  medium: '#ed6c02',
  high: '#c62828',
};

/**
 * Genera el HTML del correo de aviso de una fuga de agua reportada
 * por un ciudadano, para ser enviado a la cuadrilla de mantenimiento.
 */
export function generateReportTemplate(dto: CreateReportDto): string {
  const severityLabel = SEVERITY_LABELS[dto.severity] ?? dto.severity;
  const severityColor = SEVERITY_COLORS[dto.severity] ?? '#333333';
  const fecha = new Date().toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Nuevo reporte de fuga de agua</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <tr>
              <td style="background-color:#0d47a1; padding:20px 24px;">
                <h1 style="color:#ffffff; font-size:18px; margin:0;">Nuevo reporte de fuga de agua</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="font-size:14px; color:#333333; margin-top:0;">
                  Se ha registrado un nuevo reporte ciudadano de fuga de agua en la via publica.
                  A continuacion los detalles:
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top:12px;">
                  <tr>
                    <td style="padding:10px 12px; background-color:#f0f2f5; font-size:13px; font-weight:bold; color:#555555; width:160px; border:1px solid #e0e0e0;">
                      Direccion
                    </td>
                    <td style="padding:10px 12px; font-size:13px; color:#222222; border:1px solid #e0e0e0;">
                      ${dto.address}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px; background-color:#f0f2f5; font-size:13px; font-weight:bold; color:#555555; border:1px solid #e0e0e0;">
                      Descripcion
                    </td>
                    <td style="padding:10px 12px; font-size:13px; color:#222222; border:1px solid #e0e0e0;">
                      ${dto.description}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px; background-color:#f0f2f5; font-size:13px; font-weight:bold; color:#555555; border:1px solid #e0e0e0;">
                      Severidad
                    </td>
                    <td style="padding:10px 12px; font-size:13px; border:1px solid #e0e0e0;">
                      <span style="display:inline-block; padding:2px 10px; border-radius:12px; background-color:${severityColor}; color:#ffffff; font-size:12px; font-weight:bold;">
                        ${severityLabel}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px; background-color:#f0f2f5; font-size:13px; font-weight:bold; color:#555555; border:1px solid #e0e0e0;">
                      Telefono de contacto
                    </td>
                    <td style="padding:10px 12px; font-size:13px; color:#222222; border:1px solid #e0e0e0;">
                      ${dto.reporterPhone}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px; background-color:#f0f2f5; font-size:13px; font-weight:bold; color:#555555; border:1px solid #e0e0e0;">
                      Fecha del reporte
                    </td>
                    <td style="padding:10px 12px; font-size:13px; color:#222222; border:1px solid #e0e0e0;">
                      ${fecha}
                    </td>
                  </tr>
                </table>
                <p style="font-size:12px; color:#888888; margin-top:20px;">
                  Favor de atender el reporte y actualizar su estatus una vez resuelto.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f0f2f5; padding:14px 24px; text-align:center;">
                <p style="font-size:11px; color:#999999; margin:0;">
                  Sistema de Reportes de Fugas de Agua - Municipio
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}