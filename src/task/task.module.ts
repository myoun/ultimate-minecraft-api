import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskService } from "./task.service";

@Module({
    imports : [ScheduleModule.forRoot(), HttpModule],
    providers : [TaskService]
})
export class TaskModule {

}