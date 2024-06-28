// src/qr-generator.ts
import qr from 'qrcode';
import fs from 'fs';
import { config } from '../config/config';
import path from 'path';
import { uploadBlobFromLocalPath } from './blobStorage';

export const generateQRCode = async (text: string, fileName: string): Promise<any> => {
  try {
    const filePath: string = path.join(config.DATA_PATH,fileName);
    const qrDataUrl = await qr.toDataURL(text);
    await fs.promises.writeFile(filePath, qrDataUrl.split(',')[1], 'base64');
    const uploadedBlob = await uploadBlobFromLocalPath(fileName, filePath, 'qr');
    console.log(`QR code generated and saved to ${uploadedBlob?.url}`);
    return uploadedBlob;
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

export const generateEventUrlForQr = (eventId: string): string => {
    return `${config.BASE_URL}/events/${eventId}`
}
