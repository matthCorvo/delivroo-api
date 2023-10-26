import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodEntity } from './entities/food.entity';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FoodService {
  /**
   * Service de gestion des kebabs.
   *
   * @constructor
   * @param {Repository<FoodEntity>} foodRepository - Le référentiel des entités de kebabs.
   */
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>
  ) {}

  /**
   * Crée un nouveau kebab en utilisant les données fournies dans le DTO.
   *
   * @param {CreateFoodDto} createFoodDto - Les données du kebab à créer.
   * @returns {Promise<FoodEntity>} Le kebab créé.
   */
  async create(createFoodDto: CreateFoodDto): Promise<FoodEntity> {
    const food = this.foodRepository.create(createFoodDto);
    return await this.foodRepository.save(food);
  }

  /**
   * Récupère la liste de tous les kebabs.
   *
   * @returns {Promise<FoodEntity[]>} Un tableau des kebabs créé.
   */
  async findAll(): Promise<FoodEntity[]> {
    return await this.foodRepository.find();
  }

  /**
   * Récupère un kebab spécifique en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à récupérer.
   * @returns {Promise<FoodEntity>} Le kebab récupéré.
   * @throws {NotFoundException} Si le kebab n'est pas trouvé.
   */
  async findById(id: number): Promise<FoodEntity> {
    const food: FoodEntity = await this.foodRepository.findOne({
      where: { id: id }
    });
    if (!food) throw new NotFoundException('kebab non trouvé.');
    return food;
  }

  /**
   * Met à jour les informations d'un kebab en fonction de son ID.
   *
   * @param {number} id - L'ID du kebab à mettre à jour.
   * @param {UpdateFoodDto} updateFoodDto - Les données de mise à jour du kebab.
   * @returns {Promise<FoodEntity>} Le kebab mis à jour.
   */
  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<FoodEntity> {
    const food = await this.foodRepository.findOne({ where: { id: id } });

    // Met à jour les propriétés du kebab
    food.name = updateFoodDto.name;
    food.price = updateFoodDto.price;

    return await this.foodRepository.save(food);
  }

  /**
   * Supprime un produit en fonction de son ID.
   *
   * @param {number} id - L'ID du produit à supprimer.
   */
  async remove(id: number): Promise<void> {
    const food = await this.foodRepository.findOne({ where: { id: id } });
    console.log(food);
    await this.foodRepository.remove(food);
  }

  /**
   * Recherche des kebabs en fonction d'un terme de recherche.
   *
   * @param {string} searchTerm - Le terme de recherche pour trouver des kebabs.
   * @returns {Promise<FoodEntity[]>} Un tableau de kebabs correspondant au terme de recherche.
   */
  async search(searchTerm: string): Promise<FoodEntity[]> {
    const foods = await this.foodRepository.find({
      where: {
        name: ILike(`%${searchTerm}%`)
      }
    });
    return foods;
  }
}
