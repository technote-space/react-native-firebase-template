import type { IFireStoreBaseRepository } from 'domain/shared/firestore/repository/base';
import type { IAdminFactory } from 'domain/shared/admin/factory';
import type {
  FindManyArgs,
  FindFirstArgs,
  WhereOperator,
  Where,
  CollectionReference,
  OrderByDirection,
  Query,
  CollectionFilter,
} from 'domain/shared/firestore/entity/base/query';
import type { DocumentSnapshot, QuerySnapshot } from 'domain/shared/firestore/entity/base/snapshot';

export abstract class FireStoreBaseRepository<T> implements IFireStoreBaseRepository<T> {
  protected constructor(private adminFactory: IAdminFactory) {
  }

  public abstract table(): string;

  public abstract filter(keys: string[]): CollectionFilter<T> | undefined;

  private getQuery(keys: string[]): CollectionReference<T> {
    const ref = this.adminFactory.firestore().collection(this.table()) as unknown as CollectionReference<T>;
    const filter = this.filter(keys);
    if (filter) {
      return filter(ref);
    }

    return ref;
  }

  private getFilteredQuery(keys: string[], where?: Where<T>, orderBy?: string, orderByDirection?: OrderByDirection): Query<T> {
    let query = this.getQuery(keys) as Query<T>;
    if (where) {
      Object.keys(where).forEach(key => {
        const filter = (where as { [key: string]: any })[key];
        if (typeof filter === 'object') {
          const op = Object.keys(filter)[0] as WhereOperator;
          query = query.where(key, op, filter[op]);
        } else {
          query = query.where(key, '==', filter);
        }
      });
    }
    if (orderBy) {
      query = query.orderBy(orderBy, orderByDirection);
    }

    return query;
  }

  public async list(keys: string[], args?: FindManyArgs<T>): Promise<QuerySnapshot<T>> {
    let query = this.getFilteredQuery(keys, args?.where, args?.orderBy, args?.orderByDirection);
    if (args?.take) {
      query = query.limit(args.take);
    }

    const snapshot = await query.get();
    return {
      ...snapshot,
      data(): Array<T> {
        return snapshot.docs.map(item => item.data());
      },
    };
  }

  public async fetch(keys: string[], args: FindFirstArgs<T>): Promise<DocumentSnapshot<T> | null> {
    const query = this.getFilteredQuery(keys, args.where, args.orderBy, args.orderByDirection);
    const snapshot = await query.get();

    if (!snapshot.size && args.rejectOnNotFound) {
      throw new Error('Not found');
    }
    if (!snapshot.size) {
      return null;
    }

    return snapshot.docs[0] as DocumentSnapshot<T>;
  }

  public async find(keys: string[], key: string): Promise<DocumentSnapshot<T>> {
    return await this.getQuery(keys).doc(key).get() as DocumentSnapshot<T>;
  }

  public async create(keys: string[], key: string, data: T): Promise<void> {
    await this.getQuery(keys).doc(key).set(data);
  }

  public async update(keys: string[], key: string, data: Record<string, any>): Promise<void> {
    await this.getQuery(keys).doc(key).update(data);
  }

  public async delete(keys: string[], key: string): Promise<void> {
    await this.getQuery(keys).doc(key).delete();
  }

  public watch(keys: string[], key: string, callback: (snapshot: DocumentSnapshot<T>) => Promise<void>) {
    this.getQuery(keys).doc(key).onSnapshot(async (snapshot) => {
      await callback(snapshot as DocumentSnapshot<T>);
    });
  }
}
