import { inject, injectable } from "tsyringe";
import { EntityManager } from "typeorm";
import HealthCheckRepositoryInterface from "../../../domain/interfaces/repositories/healthCheckRepositoryInterface";

@injectable()
export default class HealthCheckRepository
  implements HealthCheckRepositoryInterface
{
  constructor(
    @inject("EntityManager")
    private readonly entityManager: EntityManager
  ) {}

  public async findStatus() {
    const res = await this.entityManager.query("SELECT 1 AS check");
    return res.length > 0 ? "Ok" : "ERROR";
  }
}
