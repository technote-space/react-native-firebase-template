import type { IValue } from 'domain/shared/value';

export class UserNumber implements IValue<number> {
  private number: number;

  public static create(number: number): UserNumber {
    const instance = new this;
    instance.number = number;
    return instance;
  }

  public value(): number {
    return this.number;
  }

  public equal(other: this): boolean {
    return this.number === other.value();
  }
}
