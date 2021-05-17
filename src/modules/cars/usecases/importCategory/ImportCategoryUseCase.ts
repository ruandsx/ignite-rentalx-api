import csvParse from "csv-parse";
import { createReadStream, unlinkSync } from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface ILoadedCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(file: Express.Multer.File): Promise<ILoadedCategory[]> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;
      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name
      );

      if (!categoryAlreadyExists) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });

    return categories;
  }

  private async loadCategories(
    file: Express.Multer.File
  ): Promise<ILoadedCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(file.path);
      const categories: ILoadedCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          const category = {
            name,
            description,
          };
          categories.push(category);
        })
        .on("end", () => {
          unlinkSync(file.path);
          resolve(categories);
        })
        .on("error", (error) => reject(error));
    });
  }
}

export { ImportCategoryUseCase };
