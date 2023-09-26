import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/data/log/logger';
import HealthCheckRepositoryInterface from '../../domain/interfaces/repositories/healthCheckRepositoryInterface';

@injectable()
export default class HealthCheckService {
  constructor(
    @inject('HealthCheckRepositoryInterface')
    private readonly postgresHealthCheckRepository: HealthCheckRepositoryInterface
  ) { }

  public async checkStatusAPI() {
    Logger.debug(
      'healthCheckService - checkStatusAPI - postgresHealthCheckRepository'
    );
    const postgresCheck = await this.postgresHealthCheckRepository.findStatus();

    Logger.debug('healthCheckService - checkStatusAPI - healthcheck');
    const healthcheck = {
      name: 'Api rest typescript',
      status: 'OK',
      uptime: process.uptime(),
      timestamp: Date.now(),
      checks: [
        {
          name: 'Database',
          status: postgresCheck
        }
      ]
    };

    return healthcheck;
  }
}
