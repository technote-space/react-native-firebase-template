import type { IValue } from 'domain/shared/value';

export class UserId implements IValue<string> {
  private uid: string;

  public static create(uid: string): UserId {
    const instance = new this;
    instance.uid = uid;
    return instance;
  }

  public value(): string {
    return this.uid;
  }

  public equal(other: this): boolean {
    return this.uid === other.value();
  }
}
