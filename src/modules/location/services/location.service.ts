import { Injectable } from '@nestjs/common';
import { BrazilianStates } from 'src/shared/domain/enums/brazilian-states.enum';

@Injectable()
export class LocationService {
  findStates(): string[] {
    return Object.keys(BrazilianStates);
  }
}
