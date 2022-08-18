import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TaskService } from './task/task.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  scheduleTask(app);
  await app.listen(3000);
}

async function scheduleTask(app: INestApplication) {
  const taskService = app.get(TaskService);
  Object.getOwnPropertyNames(Object.getPrototypeOf(taskService)).filter(n => n != "constructor").forEach(async f => {
    await taskService[f]();
  })
}
bootstrap();
