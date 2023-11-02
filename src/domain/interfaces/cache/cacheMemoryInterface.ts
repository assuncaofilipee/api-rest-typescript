export default interface CacheMemoryInterface {
  connect(): Promise<void>;
  getter(key: string): Promise<string | null>;
  setter(
    key: string,
    value: string,
    expireTime: number
  ): Promise<string | null>;
  delete(key: string): Promise<void>;
  deleteAllPrefix(prefix: string): Promise<void>;
  updateExpirationDate(key: string, seconds: number): Promise<void>;
}
