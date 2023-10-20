import { ApiProperty } from '@nestjs/swagger';


export class LatLngDto {
  @ApiProperty()
  lng: number;

  @ApiProperty()
  lat: number;

}
