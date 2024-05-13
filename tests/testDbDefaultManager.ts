import { container } from 'tsyringe';
import { EntityManager } from 'typeorm';
import DataSourceContext from '../src/infrastructure/data/context/dataSourceContext';

export default async (): Promise<EntityManager> => {
  if (container.isRegistered('EntityManager')) {
    const manager = container.resolve<EntityManager>('EntityManager');
    return manager;
  }
  const conn: DataSourceContext = new DataSourceContext();
  await conn.connect();
  return conn.datasource!.manager;
};
