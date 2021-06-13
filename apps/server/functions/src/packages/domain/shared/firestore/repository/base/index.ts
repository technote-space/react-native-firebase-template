import type { CollectionFilter, FindFirstArgs, FindManyArgs } from 'domain/shared/firestore/entity/base/query';
import type { DocumentSnapshot, QuerySnapshot } from 'domain/shared/firestore/entity/base/snapshot';

export interface IFireStoreBaseRepository<T> {
  table(): string;

  filter(keys: string[]): CollectionFilter<T> | undefined;

  list(keys: string[], args?: FindManyArgs<T>): Promise<QuerySnapshot<T>>;

  fetch(keys: string[], args: FindFirstArgs<T>): Promise<DocumentSnapshot<T> | null>;

  find(keys: string[], key: string): Promise<DocumentSnapshot<T>> | never;

  create(keys: string[], key: string, data: T): Promise<void>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(keys: string[], key: string, data: Record<string, any>): Promise<void>;

  delete(keys: string[], key: string): Promise<void>;

  watch(keys: string[], key: string, callback: (snapshot: DocumentSnapshot<T>) => Promise<void>): void;
}
