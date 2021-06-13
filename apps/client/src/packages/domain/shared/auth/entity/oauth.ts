export type GitHubConfig = {
  clientId: string;
  redirectUri: string;
  scopes: Array<string>;
  useProxy?: boolean;
};
