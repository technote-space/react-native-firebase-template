export interface IValue<T> {
  value(): T;

  equal(other: this): boolean;
}
