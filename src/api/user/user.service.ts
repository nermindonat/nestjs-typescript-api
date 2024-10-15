import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Prisma } from '@prisma/client';
import { User } from './entity/user.entity';

// @Injectable() dekoratörü ile tanımlanır, böylece bu provider'lar, diğer sınıflarda enjekte edilip kullanılabilir.
@Injectable()
export class UserService {
  constructor(private readonly DBService: DBService) {}

  async findAll() {
    const list = await this.DBService.user.findMany();
    return list;
  }

  async create(payload: CreateUserDto) {
    return await this.DBService.user.create({
      data: payload,
    });
  }

  async findUserById(id: number) {
    const item = await this.DBService.user.findUnique({
      where: {
        id,
      },
    });
    return item;
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const item = await this.DBService.user.update({
      where: { id },
      data,
    });
    return item;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.DBService.user.findUnique({
      where: { email },
    });
  }

  async deleteUser(id: number) {
    const item = await this.DBService.user.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.DBService.user.delete({
      where: { id },
    });
    return item;
  }
}
