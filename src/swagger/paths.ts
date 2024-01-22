import getHealthCheck from './healthcheck/getHealthCheck';
import getSubject from './subject/getSubject';
import postSubject from './subject/postSubject';
import putSubject from './subject/putSubject';

export default {
  paths: {
    '/v1/health-check': {
      ...getHealthCheck
    },
    '/v1/subjects': {
      ...postSubject,
      ...getSubject,
      ...putSubject
    }
  }
};
