import csvParse from "csv-parse";
import { createReadStream, unlinkSync } from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ILoadedCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(file: Express.Multer.File): Promise<ILoadedCategory[]> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;
      const categoryAlreadyExists = this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        this.categoriesRepository.create({
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
