import { IsNotEmpty, IsMACAddress, IsString } from 'class-validator';

export class NewCharData {
  @IsNotEmpty()
  @IsMACAddress()
  macAddress: string;

  @IsNotEmpty()
  data: Buffer;

  @IsNotEmpty()
  @IsString()
  charUUID: string;
}
