import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'LatLng' })
export class LatLngEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  public lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  public lng: number;

  
}
