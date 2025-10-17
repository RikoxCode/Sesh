import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  abbreviation: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Passwort muss mindestens 8 Zeichen lang sein' })
  password: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;
}
