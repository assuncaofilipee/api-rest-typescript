import * as dotenv from 'dotenv';
import App from './app';

dotenv.config();


dotenv.config();
const run = async () => {
  const api = new App();
  const appName = process.env.APP_NAME!.toString();
  const port = parseInt(process.env.APP_PORT ?? '3000', 10);

  await api.initialize();
  api.start(port, appName);
};

run();
