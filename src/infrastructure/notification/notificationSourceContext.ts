import { inject, injectable } from 'tsyringe';
import Logger from '../data/log/logger';
import NotificationInterface from '../../domain/interfaces/notification/notificationInterface';
import { Channel, Connection, ConsumeMessage } from 'amqplib';


@injectable()
export default class NotificationSourceContext implements NotificationInterface {
  private channel: Channel;

  constructor(
    @inject('RabbitmqClient')
    private readonly rabbitmqClient: Connection
  ) {}

  connect = async (): Promise<void> => {
    try {
      Logger.debug('Rabbitmq connection is successfully');
      const connection: Connection = await this.rabbitmqClient;
      this.channel = await connection.createChannel();
      await this.channel.consume('myQueue', this.consumer());
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('Error connecting to Rabbitmq server', {
          error: error.message
        });
      }
      throw error;
    }
  };

  sendMessages = async(message: string): Promise<void> => {
    const connection: Connection = await this.rabbitmqClient;
    this.channel = await connection.createChannel();
    this.channel.sendToQueue('myQueue', Buffer.from(message));
    this.channel.close();
  }

  consumer = () => (msg: ConsumeMessage | null): void => {
    if(msg) {
      console.log(msg.content.toString());
      this.channel.ack(msg);
    }
  }
}