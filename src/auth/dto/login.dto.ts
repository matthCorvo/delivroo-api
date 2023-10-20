import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'L\'adresse email de l\'utilisateur',
    example: 'utilisateur@example.com',
  })
  @IsEmail({}, { message: 'L\'adresse email n\'est pas valide' })
  email: string;

  @ApiProperty({
    description: 'Le mot de passe de l\'utilisateur',
    example: 'MotDePasseSecret',
  })
  @IsString()
  @MinLength(4, { message: 'Le mot de passe doit contenir au moins 4 caractères' })
  password: string;
}