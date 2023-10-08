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

export default class App {
  public express: express.Application = express();


  public async start(port: number, appName: string): Promise<void> {
    await this.dependencyContainer();

    this.express.use(express.json());
    await this.routes();
    
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

    Logger.info('Routes initialized!');
  }
}
