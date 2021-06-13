import 'reflect-metadata';
import 'root/config/registry';

import type { IRootService } from 'domain/shared/app/service/root';
import { registerRootComponent } from 'expo';
import { container } from 'tsyringe';

registerRootComponent(container.resolve<IRootService>('IRootService').get());
