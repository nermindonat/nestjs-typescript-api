import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';
import * as districtsData from './data/districts.json';

@Injectable()
export class DistrictService {
  constructor(private readonly DBService: DBService) {}

  async findAll() {
    return await this.DBService.district.findMany({
      include: {
        city: true,
      },
    });
  }

  async findDistrictById(id: number) {
    const district = await this.DBService.district.findUnique({
      where: { id: id },
      include: {
        city: true,
      },
    });

    if (!district) {
      throw new NotFoundException('District not found');
    }

    return district;
  }

  async findByCityId(cityId: number) {
    const districts = await this.DBService.district.findMany({
      where: { cityId },
      include: {
        city: true,
      },
    });

    if (!districts || districts.length === 0) {
      throw new NotFoundException(
        `No districts found for city with ID ${cityId}`,
      );
    }

    return districts;
  }

  async seedDistricts() {
    try {
      for (const city of districtsData.cities) {
        // Her şehrin ilçelerini dön
        for (const districtName of city.districts) {
          // Her ilçe için upsert işlemi yap
          await this.DBService.district.upsert({
            where: {
              name_cityId: {
                name: districtName,
                cityId: city.cityId,
              },
            },
            update: {}, // Varsa güncelleme yapma
            create: {
              name: districtName,
              cityId: city.cityId,
            },
          });
        }
      }
      return { message: 'Districts seeded successfully' };
    } catch (error) {
      console.error('Error seeding districts:', error);
      throw error;
    }
  }
}
