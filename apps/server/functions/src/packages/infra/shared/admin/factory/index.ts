import type { IAdminFactory } from 'domain/shared/admin/factory';
import Auth from 'firebase-admin/lib/auth';
import * as admin from 'firebase-admin';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AdminFactory implements IAdminFactory {
  private readonly __firestore: FirebaseFirestore.Firestore;
  private readonly __auth: Auth.auth.Auth;

  public constructor(
    @inject('firebase.config') private config: Record<string, any>,
    @inject('firebase.service.account') private serviceAccount: Record<string, any>,
  ) {
    if (!admin.apps.length) {
      const options = {
        ...this.config,
        credential: admin.credential.cert(this.serviceAccount),
      };
      admin.initializeApp(options);
    }

    this.__firestore = admin.firestore();
    this.__auth = admin.auth();
  }

  public firestore(): FirebaseFirestore.Firestore {
    return this.__firestore;
  }

  public auth(): Auth.auth.Auth {
    return this.__auth;
  }
}
