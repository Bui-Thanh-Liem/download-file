import { ApiProperty } from '@nestjs/swagger';

export class CreateDownloadDto {
  @ApiProperty({ type: String, description: 'Tên file cần tải' })
  fileName: string;
}
