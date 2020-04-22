import { getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: RequestDTO): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const findCategorySameTitle = await categoriesRepository.findOne({
      where: { title },
    });

    if (findCategorySameTitle) {
      // throw new AppError('This appointment is already booked');
      return findCategorySameTitle;
    }

    const category = categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
