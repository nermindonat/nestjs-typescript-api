import { City } from '../../city/entity/city.entity';

export class District {
  id: number;
  name: string;
  cityId: number;
  city?: City;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
