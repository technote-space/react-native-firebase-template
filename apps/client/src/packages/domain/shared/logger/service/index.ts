/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoggerService {
  log(...data: any[]): void;

  info(...data: any[]): void;

  debug(...data: any[]): void;

  warn(...data: any[]): void;

  error(...data: any[]): void;
}
