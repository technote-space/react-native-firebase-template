import type { Route } from '@octokit/types/dist-types/Route';
import type { Endpoints } from '@octokit/types/dist-types/generated/Endpoints';
import type { IOctokitService, Options, Response } from 'domain/shared/github/service/octokit';
import type { AccessToken } from 'domain/shared/github/value/accessToken';
import { Octokit } from '@octokit/rest';

export class OctokitService implements IOctokitService {
  public async request<R extends Route>(token: AccessToken, route: keyof Endpoints | R, options?: Options<R>): Promise<Response<R>> {
    const client = new Octokit({ auth: token.value() });
    const response = await client.request(route, options);
    return response.data;
  }
}
