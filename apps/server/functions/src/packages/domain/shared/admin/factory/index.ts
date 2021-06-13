import type Auth from 'firebase-admin/lib/auth';

export interface IAdminFactory {
  firestore(): FirebaseFirestore.Firestore;

  auth(): Auth.auth.Auth;
}
