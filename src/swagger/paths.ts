import getHealthCheck from './healthcheck/getHealthCheck';

export default {
  paths: {
    '/v1/health-check': {
      ...getHealthCheck
    }
  }
};
