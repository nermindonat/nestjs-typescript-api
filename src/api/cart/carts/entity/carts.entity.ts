import { User } from 'src/api/user/entity/user.entity';

export class Carts {
  id: number;
  userId?: number;
  user?: User;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
