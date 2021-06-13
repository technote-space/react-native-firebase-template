import type { RequestParameters } from '@octokit/types/dist-types/RequestParameters';
import type { Route } from '@octokit/types/dist-types/Route';
import type { Endpoints } from '@octokit/types/dist-types/generated/Endpoints';
import type { AccessToken } from 'domain/shared/github/value/accessToken';

export type Options<R extends Route> = R extends keyof Endpoints ? Endpoints[R]['parameters'] & RequestParameters : RequestParameters;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Response<R extends Route> = R extends keyof Endpoints ? Endpoints[R]['response']['data'] : any;

export interface IOctokitService {
  request<R extends Route>(token: AccessToken, route: keyof Endpoints | R, options?: Options<R>): Promise<Response<R>>;
}
