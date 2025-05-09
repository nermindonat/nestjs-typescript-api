import { City } from 'src/api/set/city/entity/city.entity';
import { District } from 'src/api/set/district/entity/district.entity';
import { Neighbourhood } from 'src/api/set/neighbourhood/entity/neighbourhood.entity';

export class CustomerAddress {
  id: number;
  name: string;
  surname: string;
  phone: string;
  cityId: number;
  city: City;
  districtId: number;
  district: District;
  neighbourhoodId: number;
  neighbourhood: Neighbourhood;
  address: string;
  addressTitle: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
