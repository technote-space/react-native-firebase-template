import type { IValue } from 'domain/shared/value';

export class UserName implements IValue<string> {
  private name: string;

  public static create(name: string): UserName {
    const instance = new this;
    instance.name = name;
    return instance;
  }

  public value(): string {
    return this.name;
  }

  public equal(other: this): boolean {
    return this.name === other.value();
  }
}
