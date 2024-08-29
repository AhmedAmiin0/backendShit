import { Module } from '@nestjs/common';
import { AxiosService } from './axios/axios.service';

@Module({
  providers: [AxiosService],
})
export class SharedModuleModule {}
