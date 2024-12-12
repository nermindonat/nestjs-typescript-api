export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
