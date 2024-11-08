import { Controller, Get, Res, Query } from '@nestjs/common';
import { DownloadService } from './download.service';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDownloadDto } from './download.dto';

@ApiTags('download')
@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get()
  @ApiOperation({ summary: 'Tạo bài viết' })
  async downloadFile(
    @Query() queries: CreateDownloadDto,
    @Res() res: Response,
  ) {
    const fileStream = await this.downloadService.getFileStream(
      queries.fileName,
    );

    let contentType = 'application/octet-stream';
    const extname = queries.fileName.split('.').pop();

    switch (extname) {
      case 'pdf':
        contentType = 'application/pdf';
        break;
      case 'doc':
        contentType = 'application/msword';
        break;
      case 'docx':
        contentType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
    }

    // Trình duyệt chỉ tải không đọc
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${queries.fileName}`,
    );
    res.setHeader('Content-Type', contentType);
    fileStream.pipe(res);
  }
}
