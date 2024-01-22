import { DependencyContainer, instanceCachingFactory } from 'tsyringe';
import DataSourceContext from './infrastructure/data/context/dataSourceContext';
import Logger from './infrastructure/data/log/logger';
import HealthCheckRepositoryInterface from './domain/interfaces/repositories/healthCheckRepositoryInterface';
import HealthCheckRepository from './infrastructure/data/repositories/healthCheckRepository';
import SubjectRepositoryInterface from './domain/interfaces/repositories/subjectRepositoryInterface';
import SubjectRepository from './infrastructure/data/repositories/subjectRepository';
import CourseRepositoryInterface from './domain/interfaces/repositories/courseRepositoryInterface';
import CourseRepository from './infrastructure/data/repositories/courseRepository';
import VideoRepositoryInterface from './domain/interfaces/repositories/videoRepositoryInterface';
import VideoRepository from './infrastructure/data/repositories/videoRepository';
import { RedisClientType, createClient } from 'redis';
import CacheMemoryInterface from './domain/interfaces/cache/cacheMemoryInterface';
import CacheSourceContext from './infrastructure/cache/cacheSourceContext';
import UserRepositoryInterface from './domain/interfaces/repositories/userRepositoryInterface';
import NotificationInterface from './domain/interfaces/notification/notificationInterface';
import NotificationSourceContext from './infrastructure/notification/notificationSourceContext';
import client, { Channel, Connection } from 'amqplib';
import UserRepository from './infrastructure/data/repositories/userRepository';

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
      useClass: HealthCheckRepository
    }
  );

  container.register<SubjectRepositoryInterface>(
    'SubjectRepositoryInterface',
    {
      useClass: SubjectRepository
    }
  );

  container.register<CourseRepositoryInterface>(
    'CourseRepositoryInterface',
    {
      useClass: CourseRepository
    }
  );

  container.register<VideoRepositoryInterface>(
    'VideoRepositoryInterface',
    {
      useClass: VideoRepository
    }
  );

  container.register<UserRepositoryInterface>(
    'UserRepositoryInterface',
    {
      useClass: UserRepository
    }
  );

  container.register<Connection>('RabbitmqClient', {
    useFactory: instanceCachingFactory(() => {
     return client.connect('amqp://username:password@rabbitmq:5672') as unknown as Connection;
    })
  });

  container.register<NotificationInterface>(
    'NotificationInterface',
    {
      useClass: NotificationSourceContext
    }
  );

  container.register<RedisClientType>('RedisClient', {
    useFactory: instanceCachingFactory(() => {
      return createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        password: `${process.env.REDIS_PASSWORD}`
      }) as RedisClientType;
    })
  });

  container.register<CacheMemoryInterface>('CacheMemoryInterface', {
    useClass: CacheSourceContext
  });
};


export default async (container: DependencyContainer): Promise<void> => {
  Logger.info('Dependency container initializing...');

  await registerDependencies(container);

  Logger.info('Dependency container initialized!');
};
