import type { IValue } from 'domain/shared/value';
import { InvalidValueException } from 'domain/shared/value/exception/invalidValue';

export class AccessToken implements IValue<string> {
  private token: string;

  public static create(token: string): AccessToken {
    if (!token) {
      throw new InvalidValueException();
    }

    const instance = new this;
    instance.token = token;
    return instance;
  }

  public value(): string {
    return this.token;
  }

  public equal(other: this): boolean {
    return this.token === other.value();
  }
}
