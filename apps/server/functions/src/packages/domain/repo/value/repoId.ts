import type { IValue } from 'domain/shared/value';

export class RepoId implements IValue<number> {
  private id: number;

  public static create(id: number): RepoId {
    const instance = new this;
    instance.id = id;
    return instance;
  }

  public value(): number {
    return this.id;
  }

  public equal(other: this): boolean {
    return this.id === other.value();
  }
}
