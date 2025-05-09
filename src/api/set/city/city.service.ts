import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import * as citiesData from './data/cities.json';

@Injectable()
export class CityService {
  constructor(private readonly DBService: DBService) {}

  async findAll() {
    return await this.DBService.city.findMany();
  }

  async findCityById(id: number) {
    const city = await this.DBService.city.findUnique({
      where: { id },
    });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }

  // async seedCities() {
  //   const cities = citiesData.cities;
  //   for (const city of cities) {
  //     await this.DBService.city.upsert({
  //       where: { plateCode: city.plateCode },
  //       update: {},
  //       create: city,
  //     });
  //   }
  //   return { message: 'Cities seeded successfully' };
  // }
}
