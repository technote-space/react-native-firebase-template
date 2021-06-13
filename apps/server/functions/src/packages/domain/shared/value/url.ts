import type { IValue } from 'domain/shared/value';
import { InvalidValueException } from 'domain/shared/value/exception/invalidValue';
import isURL from 'validator/lib/isURL';

export class Url implements IValue<string> {
  private url: string;

  public static create(url: string): Url {
    if (!isURL(url)) {
      throw new InvalidValueException();
    }

    const instance = new this;
    instance.url = url;
    return instance;
  }

  public value(): string {
    return this.url;
  }

  public equal(other: this): boolean {
    return this.url === other.value();
  }
}
