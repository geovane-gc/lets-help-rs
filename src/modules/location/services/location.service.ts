import { Injectable } from '@nestjs/common';
import { BrazilianStates } from '@prisma/client';

@Injectable()
export class LocationService {
  findStates(): string[] {
    return Object.keys(BrazilianStates);
  }
}
