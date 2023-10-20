import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from './entities/user-roles.enum';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

    /**
   * Créer un nouvel utilisateur
   * @param createUserDto Les données de l'utilisateur à créer
   * @returns L'utilisateur créé
   */
  @Post('/register')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Récupérer tous les utilisateurs 
   * @param req La requête HTTP
   * @returns La liste de tous les utilisateurs
   */
  @ApiSecurity('JWT-auth')
  @Get()
  @UseGuards(new RoleGuard(Roles.ADMIN))
  findAll(@Req() req) {
    console.log(req.user);
    return this.userService.findAll();
  }

  /**
   * Supprimer un utilisateur par ID 
   * @param id L'ID de l'utilisateur à supprimer
   * @param req La requête HTTP
   * @returns L'utilisateur supprimé
   */
  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @UseGuards(new RoleGuard(Roles.ADMIN))
  remove(@Param('id') id: string, @Req() req) {
    console.log(req.user);
    return this.userService.remove(+id);
  }
}