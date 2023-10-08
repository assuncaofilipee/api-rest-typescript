import { DependencyContainer, instanceCachingFactory } from 'tsyringe';
import DataSourceContext from './infrastructure/data/context/dataSourceContext';
import Logger from './infrastructure/data/log/logger';
import HealthCheckRepositoryInterface from './domain/interfaces/repositories/healthCheckRepositoryInterface';
import PostgresHealthCheckRepository from './infrastructure/data/repositories/postgresHealthCheckRepository';
import SubjectRepositoryInterface from './domain/interfaces/repositories/subjectRepositoryInterface';
import PostgresSubjectRepository from './infrastructure/data/repositories/postgresSubjectRepository';
import CourseRepositoryInterface from './domain/interfaces/repositories/courseRepositoryInterface';
import PostgresCourseRepository from './infrastructure/data/repositories/postgresCourseRepository';
import VideoRepositoryInterface from './domain/interfaces/repositories/videoRepositoryInterface';
import PostgresVideoRepository from './infrastructure/data/repositories/postgresVideoRepository';
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

  container.register<SubjectRepositoryInterface>(
    'SubjectRepositoryInterface',
    {
      useClass: PostgresSubjectRepository
    }
  );

  container.register<CourseRepositoryInterface>(
    'CourseRepositoryInterface',
    {
      useClass: PostgresCourseRepository
    }
  );

  container.register<VideoRepositoryInterface>(
    'VideoRepositoryInterface',
    {
      useClass: PostgresVideoRepository
    }
  );
};


export default async (container: DependencyContainer): Promise<void> => {
  Logger.info('Dependency container initializing...');

  await registerDependencies(container);

  Logger.info('Dependency container initialized!');
};
