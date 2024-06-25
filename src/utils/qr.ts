// src/qr-generator.ts
import qr from 'qrcode';
import fs from 'fs';
import { config } from '../config/config';

export const generateQRCode = async (text: string, filePath: string): Promise<void> => {
  try {
    // Generate QR code as a data URL
    const qrDataUrl = await qr.toDataURL(text);

    // Save QR code as PNG file
    await fs.promises.writeFile(filePath, qrDataUrl.split(',')[1], 'base64');

    console.log(`QR code generated and saved to ${filePath}`);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

export const generateQrUrl = (eventId: string): string => {
    return `${config.BASE_URL}/events/${eventId}`
}
