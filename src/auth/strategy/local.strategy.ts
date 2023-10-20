import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { UserService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.findUserByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
      return user;
    } else {
      throw new UnauthorizedException('Utilisateur introuvable ou mot de passe non valide');
    }
  }
}