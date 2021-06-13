import type { AccessToken } from 'domain/shared/github/value/accessToken';
import type { Route } from '@octokit/types/dist-types/Route';
import type { Endpoints } from '@octokit/types/dist-types/generated/Endpoints';
import { RequestParameters } from '@octokit/types/dist-types/RequestParameters';

export type Options<R extends Route> = R extends keyof Endpoints ? Endpoints[R]['parameters'] & RequestParameters : RequestParameters;
export type Response<R extends Route> = R extends keyof Endpoints ? Endpoints[R]['response']['data'] : any;

export interface IOctokitService {
  request<R extends Route>(token: AccessToken, route: keyof Endpoints | R, options?: Options<R>): Promise<Response<R>>;
}
