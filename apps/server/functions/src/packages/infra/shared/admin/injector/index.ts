import type { IAdminInjector } from 'domain/shared/admin/injector';
import type Auth from 'firebase-admin/lib/auth';
import * as admin from 'firebase-admin';
import { inject, singleton } from 'tsyringe';

@singleton()
export class AdminInjector implements IAdminInjector {
  private readonly __firestore: FirebaseFirestore.Firestore;
  private readonly __auth: Auth.auth.Auth;

  public constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @inject('firebase.config') private config: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
