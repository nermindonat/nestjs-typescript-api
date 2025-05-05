import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/database/DB.service';

@Injectable()
export class NeighbourhoodService {
  constructor(private readonly DBService: DBService) {}
  async findByDistrictId(districtId: number) {
    const neighbourhoods = await this.DBService.neighbourhood.findMany({
      where: { districtId },
      include: {
        district: true,
      },
    });

    if (!neighbourhoods || neighbourhoods.length === 0) {
      throw new NotFoundException(
        `No neighbourhoods found for district with ID ${districtId}`,
      );
    }

    return neighbourhoods;
  }
}
