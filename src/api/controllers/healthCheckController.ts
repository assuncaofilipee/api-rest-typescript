import { container } from 'tsyringe';
import { Request, Response } from 'express';
import HealthCheckService from '../../application/services/healthCheckService';
import Logger from '../../infrastructure/data/log/logger';
import { ok } from '../helpers/httpHelper';

export default class HealthCheckController {
  public async getStatusAPI(request: Request, response: Response) {
    Logger.debug('healthCheckController - getStatusAPI - healthCheckService');
    const healthCheckService = container.resolve(HealthCheckService);
    const result = await healthCheckService.checkStatusAPI();
    return ok(response, { data: result });
  }
}
