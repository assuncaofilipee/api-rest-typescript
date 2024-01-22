import { EntityManager } from 'typeorm';

export default async function clearDatabase(
  manager: EntityManager
): Promise<void> {
  const entities = manager.connection.entityMetadatas;

  for (const entity of entities) {
    const repository = manager.connection.getRepository(entity.name);
    await repository.query(`TRUNCATE public.${entity.tableName} CASCADE;`);
  }
}
