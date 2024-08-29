import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AxiosService {
  constructor(private configService: ConfigService) {}

  getApiUrl(): string {
    return this.configService.get('API_URL');
  }

  getApiKey(): string {
    return this.configService.get('API_KEY');
  }

  //   // make a method that takes URL and params then
  //     getAirQualityUrl(lat: number, lon: number): string {
  //         return `${this.getApiUrl()}?lat=${lat}&lon=${lon}&key=${this.getApiKey()}`;
  //     }
}
