import { District } from '../../district/entity/district.entity';

export class Neighbourhood {
  id: number;
  name: string;
  districtId: number;
  district?: District;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
