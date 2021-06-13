import type { Data } from 'domain/shared/firestore/entity/base/data';
import type { Reference } from 'domain/shared/firestore/entity/base/reference';

export type DocumentSnapshot<T extends Data> = {
  readonly id: string;
  readonly ref: Reference<T>;
  isEqual(other: DocumentSnapshot<T>): boolean;
} & ({
  readonly exists: true;
  data(): T;
} | {
  readonly exists: false;
  data(): undefined;
});

export type QuerySnapshot<T extends Data> = {
  readonly size: number;
  readonly empty: boolean;
  data(): Array<T>;
};
