import { resolve } from 'path';
import { container } from 'tsyringe';

const dir = resolve(__dirname, '../../../../config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
container.registerInstance('firebase.config', require(resolve(dir, process.env.FIREBASE_CONFIG_FILE ?? 'firebase.dev.json')));
// eslint-disable-next-line @typescript-eslint/no-var-requires
container.registerInstance('firebase.service.account', require(resolve(dir, process.env.FIREBASE_SERVICE_ACCOUNT_FILE ?? 'firebase-service-account.dev.json')));
