import { DependencyContainer, instanceCachingFactory } from 'tsyringe';
import DataSourceContext from './infrastructure/data/context/dataSourceContext';
import Logger from './infrastructure/data/log/logger';
import HealthCheckRepositoryInterface from './domain/interfaces/repositories/healthCheckRepositoryInterface';
import PostgresHealthCheckRepository from './infrastructure/data/repositories/healthCheckRepository';
const registerDependencies = async (
  container: DependencyContainer
): Promise<void> => {
  const databaseConnection = new DataSourceContext();
  await databaseConnection.connect();

  container.register<DataSourceContext>('DataSourceContext', {
    useFactory: instanceCachingFactory(() => databaseConnection)
  });

  container.registerInstance(
    'EntityManager',
    databaseConnection.datasource!.manager
  );

  container.register<HealthCheckRepositoryInterface>(
    'HealthCheckRepositoryInterface',
    {
      useClass: PostgresHealthCheckRepository
    }
  );
};


export default async (container: DependencyContainer): Promise<void> => {
  Logger.info('Dependency container initializing...');

  await registerDependencies(container);

  Logger.info('Dependency container initialized!');
};
