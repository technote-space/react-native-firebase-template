export interface INotificationService {
  setup(): void;

  teardown(): void;

  register(uid: string): Promise<void>;

  unregister(uid: string): Promise<void>;

  dismiss(): Promise<void>;
}
