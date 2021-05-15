import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../entities/Specification";

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationsRepository };
