import { Router } from 'express';
import { container } from 'tsyringe';
import * as subjectControllerRequestValidation from '../../../application/validations/subjectControllerRequestValidation';
import SubjectController from '../../controllers/subjectController';

export default async (): Promise<Router> => {
  const router = Router();
  const subjectController = container.resolve(SubjectController);

  router.use('/v1/subject', router);
  router.post('',
  subjectControllerRequestValidation.saveSubjectRequestValidation,
  subjectController.save);

  router.get('', subjectController.get);

  return router;
};
