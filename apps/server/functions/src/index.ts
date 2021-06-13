import type { IEntryService } from 'domain/shared/app/service/entry';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import 'root/config/registry';
import { container } from 'tsyringe';

dotenv.config();

Object.entries(container.resolve<IEntryService>('IEntryService').handle(process.env.FUNCTION_NAME)).forEach(([name, func]) => {
  exports[name] = func;
});
