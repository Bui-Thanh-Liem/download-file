import { Module } from '@nestjs/common';
import { DownloadModule } from './apis/downloads/download.module';

@Module({
  imports: [DownloadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
