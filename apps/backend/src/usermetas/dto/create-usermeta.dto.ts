import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsermetaDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  metaKey: string;

  @IsString()
  @IsNotEmpty()
  metaValue: string;
}
