import 'reflect-metadata';
import express from 'express';

export default class App {
  public express: express.Application = express();

  public async start(port: number, appName: string): Promise<void> {
   
    this.express.listen(port, '0.0.0.0', async () => {
      console.log(`The ${appName} service is running on port ${port}!`);
    });
  }
}
