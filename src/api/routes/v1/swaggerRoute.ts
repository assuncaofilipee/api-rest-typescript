import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../../../swagger/swaggerDocs';

export default async (): Promise<Router> => {
  const router = Router();

  router.use('/api-docs', swaggerUi.serve as any);
  router.get('/api-docs', swaggerUi.setup(swaggerDocs) as any);

  return router;
};
