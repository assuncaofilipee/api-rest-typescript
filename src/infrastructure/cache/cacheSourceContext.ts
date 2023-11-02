import { RedisClientType } from 'redis';
import { inject, injectable } from 'tsyringe';
import CacheMemoryInterface from '../../domain/interfaces/cache/cacheMemoryInterface';
import Logger from '../data/log/logger';

@injectable()
export default class CacheSourceContext implements CacheMemoryInterface {
  constructor(
    @inject('RedisClient')
    private readonly redisClient: RedisClientType
  ) {}

  connect = async (): Promise<void> => {
    try {
      const REDIS_DB_NUM = process.env.REDIS_DB_NUM
        ? parseInt(process.env.REDIS_DB_NUM, 10)
        : 0;
      await this.redisClient.connect();
      await this.redisClient.select(REDIS_DB_NUM);

      Logger.debug('Redis connection is successfully');
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('Error connecting to redis server', {
          error: error.message
        });

        throw error;
      }
    }
  };

  getter = async (key: string): Promise<string | null> => {
    let result: string | null = null;

    try {
      result = await this.redisClient.get(key);
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('Error getting value to redis server', {
          error: error.message
        });

        throw error;
      }
    }
    return result;
  };

  setter = async (
    key: string,
    value: string,
    expireTime: number
  ): Promise<string | null> => {
    let result: string | null = null;

    try {
      result = await this.redisClient.set(key, value, { EX: expireTime });
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('Error setting value to redis server', {
          error: error.message
        });

        throw error;
      }
    }
    return result;
  };

  updateExpirationDate = async (
    key: string,
    seconds: number
  ): Promise<void> => {
    try {
      await this.redisClient.expireAt(key, seconds);
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('Error setting value to redis server', {
          error: error.message
        });

        throw error;
      }
    }
  };

  delete = async (key: string): Promise<void> => {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('Error deleting value to redis server', {
          error: error.message
        });

        throw error;
      }
    }
  };

  deleteAllPrefix = async (prefix: string): Promise<void> => {
    try {
      const keys = await this.redisClient.keys(prefix);
      keys.map(async key => {
        await this.redisClient.del(key);
      });
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('Error deleting value to redis server', {
          error: error.message
        });

        throw error;
      }
    }
  };
}
