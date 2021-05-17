import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/entities/Specification";

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationsRepository };
