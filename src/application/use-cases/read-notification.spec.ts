import Content from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ReadNotification } from './read-notification';
import { NotificationNotFound } from './errors/notification-not-found';

let notificationsRepository: InMemoryNotificationsRepository;
let readNotification: ReadNotification;

describe('Read notification', () => {
  beforeAll(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    readNotification = new ReadNotification(notificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = new Notification({
      category: 'social',
      content: new Content('This is a notification'),
      recipientId: 'example-notification-recipientId',
    });

    await notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not able to read a non existing notification', () => {
    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
