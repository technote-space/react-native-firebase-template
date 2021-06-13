import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

import 'root/config/registry';
import type { IEntryService } from 'domain/shared/app/service/entry';
import { container } from 'tsyringe';

Object.entries(container.resolve<IEntryService>('IEntryService').handle(process.env.FUNCTION_NAME)).forEach(([name, func]) => {
  exports[name] = func;
});
