import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface RequestDTO {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: RequestDTO): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const findCategorySameTitle = await categoriesRepository.findOne({
      where: { title },
    });

    if (findCategorySameTitle) {
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
