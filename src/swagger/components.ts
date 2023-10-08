import healthcheckSchemas from './healthcheck/healthcheckSchemas';
import healthCheckExamples from './healthcheck/healthCheckExamples';
import subjectSchemas from './subject/subjectSchemas';
import subjectExamples from './subject/subjectExamples';

export default {
  components: {
    schemas: {
      ...healthcheckSchemas,
      ...subjectSchemas
    },
    examples: {
      ...healthCheckExamples,
      ...subjectExamples
    }
  }
};
