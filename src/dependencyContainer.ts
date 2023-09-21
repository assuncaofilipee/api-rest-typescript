import { DependencyContainer, instanceCachingFactory } from 'tsyringe';
import DataSourceContext from './infrastructure/data/context/dataSourceContext';
import Logger from './infrastructure/data/log/logger';
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
};

export default async (container: DependencyContainer): Promise<void> => {
  Logger.info('Dependency container initializing...');

  await registerDependencies(container);

  Logger.info('Dependency container initialized!');
};
