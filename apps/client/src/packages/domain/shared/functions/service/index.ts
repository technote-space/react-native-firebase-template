export interface IFunctionsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call<Result, Data = Record<string, any>>(name: string, data?: Data): Promise<Result>;
}
