import { IsNumberString } from 'class-validator';

export class FineOneParams {
  @IsNumberString()
  id: string;
}
