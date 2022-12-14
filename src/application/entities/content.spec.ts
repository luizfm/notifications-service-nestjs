import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma notificação de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification with less than five characters', () => {
    expect(() => new Content('asd')).toThrow();
  });

  it('should not be able to create a notification with more than two hundred fourty characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
