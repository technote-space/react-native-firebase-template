import type Auth from 'firebase-admin/lib/auth';

export interface IAdminInjector {
  firestore(): FirebaseFirestore.Firestore;

  auth(): Auth.auth.Auth;
}
