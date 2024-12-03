export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
