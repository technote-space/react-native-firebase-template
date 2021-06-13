import { container } from 'tsyringe';
import { resolve } from 'path';

const dir = resolve(__dirname, '../../../../config');
container.registerInstance('firebase.config', require(resolve(dir, process.env.FIREBASE_CONFIG_FILE ?? 'firebase.dev.json')));
container.registerInstance('firebase.service.account', require(resolve(dir, process.env.FIREBASE_SERVICE_ACCOUNT_FILE ?? 'firebase-service-account.dev.json')));
