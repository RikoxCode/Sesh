import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUsermetaDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  metaKey: string;

  @IsString()
  @IsNotEmpty()
  metaValue: string;
}
