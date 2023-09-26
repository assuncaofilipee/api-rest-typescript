import { Router } from 'express';
import { container } from 'tsyringe';
import HealthCheckController from '../../controllers/healthCheckController';

export default async (): Promise<Router> => {
  const router = Router();
  const healthController = container.resolve(HealthCheckController);

  router.use('/v1', router);
  router.get('/healthcheck', healthController.getStatusAPI);

  return router;
};
