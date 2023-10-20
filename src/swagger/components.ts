import healthcheckSchemas from './healthcheck/healthcheckSchemas';
import healthCheckExamples from './healthcheck/healthCheckExamples';
import subjectSchemas from './subject/subjectSchemas';
import subjectExamples from './subject/subjectExamples';
import genericSchemas from './generic/genericSchemas';
import genericExamples from './generic/genericExamples';

export default {
  components: {
    schemas: {
      ...healthcheckSchemas,
      ...subjectSchemas,
      ...genericSchemas
    },
    examples: {
      ...healthCheckExamples,
      ...subjectExamples,
      ...genericExamples
    }
  }
};
