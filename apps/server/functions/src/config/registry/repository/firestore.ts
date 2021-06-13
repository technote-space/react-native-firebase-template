import { container } from 'tsyringe';
import { FireStoreUserBaseRepository } from 'infra/shared/firestore/repository/base/user';
import { FireStoreRepoBaseRepository } from 'infra/shared/firestore/repository/base/repo';
import { FireStoreUserRepository } from 'infra/shared/firestore/repository/user';
import { FireStoreRepoRepository } from 'infra/shared/firestore/repository/repo';

container.registerSingleton('IFireStoreUserBaseRepository', FireStoreUserBaseRepository);
container.registerSingleton('IFireStoreRepoBaseRepository', FireStoreRepoBaseRepository);
container.registerSingleton('IFireStoreUserRepository', FireStoreUserRepository);
container.registerSingleton('IFireStoreRepoRepository', FireStoreRepoRepository);
