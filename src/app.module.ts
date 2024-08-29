import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { AirQualityModule } from "@/air-quality/air-quality.module";
import { ConfigModule } from "@nestjs/config";
import { SharedModuleModule } from "@/shared/shared.module";
import { ScheduleModule } from "@nestjs/schedule";
import { DatabaseModule } from "@/database/database.module";
import config from "@/config";
console.log(config);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ScheduleModule.forRoot(),
    AirQualityModule,
    SharedModuleModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
