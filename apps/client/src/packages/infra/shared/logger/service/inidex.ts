/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDeviceService } from 'domain/shared/app/service/device';
import type { ILoggerService } from 'domain/shared/logger/service';
import { inject, singleton } from 'tsyringe';

type CallerInfo = Array<string>;

@singleton()
export class LoggerService implements ILoggerService {
  public constructor(
    @inject('IDeviceService') private deviceService: IDeviceService,
  ) {
  }

  private isValidStackTrace(): boolean {
    return this.deviceService.isWeb() && !!Error.captureStackTrace;
  }

  private getCaller(this: any, depth: number): string {
    const callerInfo: CallerInfo = [];
    const saveLimit = Error.stackTraceLimit;
    const savePrepare = Error.prepareStackTrace;

    try {
      Error.stackTraceLimit = depth + 1;
      Error.captureStackTrace(this, this.getCaller);

      Error.prepareStackTrace = function(_, stack) {
        Array.from({ length: depth >= stack.length - 1 ? stack.length - 1 : depth }, (_, index) => index + 1).forEach(index => {
          const caller = stack[index];
          callerInfo.push(caller.getFunctionName() ?? '[anonymous]');
        });
      };
      this.stack;

      return callerInfo.join(' > ');
    } finally {
      Error.stackTraceLimit = saveLimit;
      Error.prepareStackTrace = savePrepare;
    }
  }

  public log(...data: any[]): void {
    if (this.isValidStackTrace()) {
      console.log(...data, this.getCaller(3));
    } else {
      console.log(...data);
    }
  }

  public info(...data: any[]): void {
    if (this.isValidStackTrace()) {
      console.info(...data, this.getCaller(3));
    } else {
      console.info(...data);
    }
  }

  public debug(...data: any[]): void {
    if (this.isValidStackTrace()) {
      console.debug(...data, this.getCaller(10));
    } else {
      console.debug(...data);
    }
  }

  public warn(...data: any[]): void {
    if (this.isValidStackTrace()) {
      console.warn(...data, this.getCaller(5));
    } else {
      console.warn(...data);
    }
  }

  public error(...data: any[]): void {
    console.error(...data);
  }
}
