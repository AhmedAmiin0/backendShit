import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { AirQuality } from "./entities/air-quality.entity";
import { Repository } from "typeorm";
import { ApiResponse } from "@/interfaces";

@Injectable()
export class AirQualityService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(AirQuality)
    private readonly airQualityRepository: Repository<AirQuality>
  ) {}

  getAirQuality(lat: number, lon: number): Observable<ApiResponse> {
    // check if the lat and lon are valid
    if (isNaN(lat) || isNaN(lon)) {
      throw new BadRequestException("Invalid latitude or longitude");
    }

    return this.httpService
      .get(this.configService.get("API_URL"), {
        params: {
          lat,
          lon,
          key: this.configService.get("API_KEY"),
        },
      })
      .pipe(
        map((response: AxiosResponse) => {
          const pollution = response.data.data.current.pollution;
          return { Result: { Pollution: pollution } };
        }),
        catchError((error) => {
          console.error("Error fetching nearest city:", error);
          throw new BadRequestException("Failed to fetch nearest city");
        })
      );
  }

  // method to save the air quality data to the database
  async saveAirQualityData(): Promise<any> {
    const lat = 48.856613;
    const lon = 2.352222;
    const data = await firstValueFrom(this.getAirQuality(lat, lon));

    const airQuality = new AirQuality();
    airQuality.aqi = data.Result.Pollution.aqius;
    airQuality.latitude = lat;
    airQuality.longitude = lon;

    return this.airQualityRepository.save(airQuality);
  }

  async getMostPollutedTime(): Promise<AirQuality> {
    return this.airQualityRepository
      .createQueryBuilder("air_quality")
      .orderBy("air_quality.aqi", "DESC")
      .getOne();
  }
}
