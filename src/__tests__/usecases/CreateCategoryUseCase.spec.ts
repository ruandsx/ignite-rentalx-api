import { AppError } from "@errors/AppError";
import { CreateCategoryUseCase } from "@modules/cars/usecases/createCategory/CreateCategoryUseCase";
import { FakeCategoriesRepository } from "@tests/fakes/FakeCategoriesRepository";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: FakeCategoriesRepository;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Name",
      description: "Description",
    };
    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepository.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
    expect(createdCategory.name).toEqual(category.name);
    expect(createdCategory.description).toEqual(category.description);
  });

  it("Should not be able to create a new category with an existing name", async () => {
    expect(async () => {
      const category = {
        name: "Name",
        description: "Description",
      };
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
