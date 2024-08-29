import { Controller, Get, Query, ParseFloatPipe } from "@nestjs/common";
import { AirQualityService } from "./air-quality.service";
import { Cron } from "@nestjs/schedule";

@Controller("air-quality")
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get("nearest-city")
  getNearestCity(
    @Query("lat", ParseFloatPipe) lat: number,
    @Query("lon", ParseFloatPipe) lon: number
  ) {
    return this.airQualityService.getAirQuality(lat, lon);
  }

  @Get("most-polluted-time")
  async getMostPollutedTime() {
    return this.airQualityService.saveAirQualityData();
  }

  @Cron("*/1 * * * *") // Every minute
  async checkParisAirQuality() {
    this.airQualityService.getAirQuality(48.856613, 2.352222);
  }
}
