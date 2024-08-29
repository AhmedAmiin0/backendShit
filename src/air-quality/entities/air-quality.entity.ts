import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class AirQuality {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: "The unique identifier of the air quality record",
  })
  id: number;

  @Column()
  @ApiProperty({ description: "Air Quality Index" })
  aqi: number;

  @Column()
  @ApiProperty({ description: "Latitude of the location" })
  latitude: number;

  @Column()
  @ApiProperty({ description: "Longitude of the location" })
  longitude: number;

  @CreateDateColumn()
  @ApiProperty({ description: "The date and time when the record was created" })
  createdAt: Date;
}
