import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import Logger from './infrastructure/data/log/logger';
import dependencyContainer from './dependencyContainer';

export default class App {
  public express: express.Application = express();


  public async start(port: number, appName: string): Promise<void> {
    await this.dependencyContainer();
    
    this.express.listen(port, '0.0.0.0', async () => {
      Logger.info(`The ${appName} service is running on port ${port}!`);
    });
  }

  private async dependencyContainer(): Promise<void> {
    await dependencyContainer(container);
  }
}
