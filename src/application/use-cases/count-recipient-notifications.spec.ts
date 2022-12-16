import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(makeNotification());

    await notificationsRepository.create(makeNotification());

    await notificationsRepository.create(
      makeNotification({ recipientId: 'another-notification-id' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
