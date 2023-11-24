import { inject, injectable } from 'tsyringe';
import Logger from '../data/log/logger';
import NotificationInterface from '../../domain/interfaces/notification/notificationInterface';
import client, { Channel, Connection, ConsumeMessage } from 'amqplib';


@injectable()
export default class NotificationSourceContext implements NotificationInterface {
  constructor(
    @inject('RabbitmqClient')
    private readonly rabbitmqClient: Connection
  ) {}

  connect = async (): Promise<void> => {
    try {
      Logger.debug('Rabbitmq connection is successfully');
      const connection: Connection = await this.rabbitmqClient;
      const channel: Channel = await connection.createChannel();
      await channel.assertQueue('myQueue');
      this.sendMessages(channel);
      await channel.consume('myQueue', this.consumer(channel));
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('Error connecting to Rabbitmq server', {
          error: error.message
        });
      }
      throw error;
    }
  };

  sendMessages (channel: Channel): void {
    for (let i =0; i < 10; i++) {
      channel.sendToQueue('myQueue', Buffer.from(`message ${i}`));
    }
  }

  consumer = (channel: Channel) => (msg: ConsumeMessage | null): void => {
    if(msg) {
      console.log(msg.content.toString());
      channel.ack(msg);
    }
  }
}