import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  /**
   * Service de gestion des utilisateurs.
   *
   * @constructor
   * @param {Repository<UserEntity>} userRepository - Repository de l'entité UserEntity.
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

    /**
   * Crée un nouvel utilisateur enregistré dans la base de données.
   * @param createUserDto Les données de l'utilisateur à créer
   * @returns L'utilisateur créé avec un token d'authentification
   */
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    // Hache le mot de passe avant de l'enregistrer
    const saltRounds = 10; // Vous pouvez configurer le nombre de tours de sel
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(createUserDto.password, salt);    user.adresse = createUserDto.adresse;
    
    // Enregistre le nouvel utilisateur dans la base de données
    const newUser = await this.usersRepository.save(user);

    // Génère la réponse du token d'authentification
    const tokenResponse = this.generateTokenResponse(newUser);

    return tokenResponse;
  }

  /**
   * Recherche un utilisateur par son ID.
   * @param id L'ID de l'utilisateur recherché
   * @returns L'utilisateur trouvé
   */
  findUserById(id: number) {
    return this.usersRepository.findOneOrFail({ where: { id: id } });
  }

  /**
   * Récupère la liste de tous les utilisateurs.
   * @returns La liste de tous les utilisateurs
   */
  findAll() {
    return this.usersRepository.find();
  }

  /**
   * Recherche un utilisateur par son adresse e-mail.
   * @param email L'adresse e-mail de l'utilisateur recherché
   * @returns L'utilisateur trouvé
   */
  findUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  /**
   * Supprime un utilisateur par son ID.
   * @param id L'ID de l'utilisateur à supprimer
   * @returns L'utilisateur supprimé
   */
  remove(id: number) {
    return this.usersRepository.delete(id);
  }

   /**
   * Génère une réponse de token d'authentification pour un utilisateur.
   * @param user L'utilisateur pour lequel générer le token
   * @returns La réponse contenant le token et les informations de l'utilisateur
   */
   generateTokenResponse(user: UserEntity): any {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      this.configService.get('JWT_KEY'),
      {
        expiresIn: '30d',
      },
    );

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      adresse: user.adresse,
      token: token,
    };
  }

}