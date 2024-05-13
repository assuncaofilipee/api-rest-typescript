import CacheMemoryInterface from '../../src/domain/interfaces/cache/cacheMemoryInterface';

export default (): CacheMemoryInterface => ({
  connect: jest.fn(),
  getter: jest.fn(),
  setter: jest.fn(),
  delete: jest.fn(),
  deleteAllPrefix: jest.fn(),
  updateExpirationDate: jest.fn()
});
