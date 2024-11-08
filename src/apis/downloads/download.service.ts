import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Stream } from 'stream';

@Injectable()
export class DownloadService {
  async getFileStream(fileName: string): Promise<Stream> {
    const filePath = path.join('/app/public/documents', fileName); // Thư mục chứa file cần download
    return fs.createReadStream(filePath);
  }
}

// Handle client
// const blob = await response.blob();
// const link = document.createElement('a');
// link.href = URL.createObjectURL(blob);
// link.download = fileName;
// link.click();
// URL.revokeObjectURL(link.href);
