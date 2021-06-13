export interface IFunctionsService {
  call<Result, Data = Record<string, any>>(name: string, data?: Data): Promise<Result>;
}
