export default interface NotificationInterface {
  connect(): Promise<void>;
  sendMessages(message: string): void;
  consumer(): void;
}
