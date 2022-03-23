import { IsNotEmpty, IsMACAddress } from 'class-validator';

export class AddBpmDto {
  @IsNotEmpty()
  @IsMACAddress()
  macAddress: string;

  @IsNotEmpty()
  bpm: string;
}
