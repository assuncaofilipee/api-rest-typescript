import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import Logger from './infrastructure/data/log/logger';
import dependencyContainer from './dependencyContainer';
import healthCheckRoute from './api/routes/v1/healthCheckRoute';
import swaggerRoute from './api/routes/v1/swaggerRoute';
import subjectRoute from './api/routes/v1/subjectRoute';
import courseRoute from './api/routes/v1/courseRoute';
import videoRoute from './api/routes/v1/videoRoute';
import CacheMemoryInterface from './domain/interfaces/cache/cacheMemoryInterface';
import userRoute from './api/routes/v1/userRoute';
import authRoute from './api/routes/v1/authRoute';
import NotificationInterface from './domain/interfaces/notification/notificationInterface';

export default class App {
  public express: express.Application = express();


  public async initialize(): Promise<void> {
    await this.dependencyContainer();
    await this.connectToRedis();
    await this.connectToNotification();

    this.express.use(express.json());
    await this.routes();

  };

  public async start(port: number, appName: string): Promise<void> {
    this.express.listen(port, '0.0.0.0', async () => {
      Logger.info(`The ${appName} service is running on port ${port}!`);
    });
  }

  private async dependencyContainer(): Promise<void> {
    await dependencyContainer(container);
  }

  public async routes() {
    Logger.info('Routes initializing...');

    this.express.use(await healthCheckRoute());
    this.express.use(await swaggerRoute());
    this.express.use(await subjectRoute());
    this.express.use(await courseRoute());
    this.express.use(await videoRoute());
    this.express.use(await userRoute());
    this.express.use(await authRoute());

    Logger.info('Routes initialized!');
  }

  private connectToRedis = async (): Promise<void> => {
    const redis: CacheMemoryInterface = container.resolve(
      'CacheMemoryInterface'
    );
    await redis.connect();
  };

  private connectToNotification = async (): Promise<void> => {
    const notification: NotificationInterface = container.resolve(
      'NotificationInterface'
    );
    await notification.connect();
  };
}
