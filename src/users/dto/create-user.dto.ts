import { IsNotEmpty, IsString, IsEmail, IsArray, ArrayUnique, ArrayNotEmpty, Matches  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom ne peut être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email ne peut être vide' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ne peut être vide' })
  @IsString({ message: 'doit être une chaîne de caractères' })
  adresse: string;

}