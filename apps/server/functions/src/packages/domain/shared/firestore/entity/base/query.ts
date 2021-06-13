import type { Data } from 'domain/shared/firestore/entity/base/data';
import firebase from 'firebase';

type Enumerable<T> = T | Array<T>;
export type WhereOperator =
  | '<'
  | '<='
  | '=='
  | '>='
  | '>'
  | 'array-contains'
  | 'in'
  | 'array-contains-any';
type ValueType = number | string | boolean;
type Filter = {
  [key in WhereOperator]?: Enumerable<ValueType>;
};
export type Where<T extends Data> = {
  [key in keyof T]?: Filter | ValueType;
}

export type CollectionReference<T> = firebase.firestore.CollectionReference<T>;
export type DocumentReference<T> = firebase.firestore.DocumentReference<T>;
export type OrderByDirection = firebase.firestore.OrderByDirection;
export type Query<T> = firebase.firestore.Query<T>;
export type QueryDocumentSnapshot<T> = firebase.firestore.QueryDocumentSnapshot<T>;
export type CollectionFilter<T> = (ref: CollectionReference<any>) => CollectionReference<T>;

export type FindManyArgs<T extends Data> = {
  where?: Where<T>;
  orderBy?: string;
  orderByDirection?: OrderByDirection;
  take?: number;
};

export type FindFirstArgs<T extends Data> = {
  rejectOnNotFound?: boolean;
  where?: Where<T>;
  orderBy?: string;
  orderByDirection?: OrderByDirection;
};
