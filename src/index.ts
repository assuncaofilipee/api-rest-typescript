import * as dotenv from 'dotenv';
import App from './app';

dotenv.config();

const api = new App();
const appName = process.env.APP_NAME!.toString();
const appPort = parseInt(process.env.APP_PORT ?? '3000', 10);

api.start(appPort, appName);