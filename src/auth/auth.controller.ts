import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req, @Body() loginDto: LoginDto) {
    // //   jwt token
    const user: UserEntity = req.user;
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return { token: this.jwtService.sign(payload) };
  }
}