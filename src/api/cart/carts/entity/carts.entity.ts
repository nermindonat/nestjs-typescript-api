import { Customer } from 'src/api/customer/entity/customer.entity';

export class Carts {
  id: number;
  customerId?: number;
  customer?: Customer;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
