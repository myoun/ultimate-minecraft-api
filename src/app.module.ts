import { Module, Type } from '@nestjs/common';
import { AppController } from './app.controller';
import { DownloadModule } from './download/download.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [DownloadModule, TaskModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
