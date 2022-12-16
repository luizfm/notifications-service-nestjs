import Content from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

let notificationsRepository: InMemoryNotificationsRepository;
let cancelNotification: CancelNotification;

describe('Cancel notification', () => {
  beforeAll(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    cancelNotification = new CancelNotification(notificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    const notification = new Notification({
      category: 'social',
      content: new Content('This is a notification'),
      recipientId: 'example-notification-recipientId',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not able to cancel a non existing notification', () => {
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
