import type { IRootService } from 'domain/shared/app/service/root';
import { registerRootComponent } from 'expo';
import 'reflect-metadata';
import 'root/config/registry';
import { container } from 'tsyringe';

registerRootComponent(container.resolve<IRootService>('IRootService').get());
