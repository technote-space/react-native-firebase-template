import type { Data } from 'domain/shared/firestore/entity/base/data';

export type Reference<T extends Data> = {
  readonly id: string;
  isEqual: (other: Reference<T>) => boolean;
}
