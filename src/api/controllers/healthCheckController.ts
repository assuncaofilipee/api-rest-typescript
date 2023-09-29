import { container } from 'tsyringe';
import { Request, Response } from 'express';
import HealthCheckService from '../../application/services/healthCheckService';
import Logger from '../../infrastructure/data/log/logger';

export default class HealthCheckController {
  public async getStatusAPI(request: Request, response: Response) {
    Logger.debug('healthCheckController - getStatusAPI - healthCheckService');
    const healthCheckService = container.resolve(HealthCheckService);
    const result = await healthCheckService.checkStatusAPI();
    return response.status(200).json({ data: result });
  }
}
