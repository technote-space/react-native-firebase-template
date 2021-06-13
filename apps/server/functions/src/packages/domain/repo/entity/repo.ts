import type { Repo as FireStoreRepo } from 'domain/shared/firestore/entity/repo';
import type { Repo as GitHubRepo } from 'domain/shared/github/entity/repo';

export type Repo = GitHubRepo & {
  isEnabled: boolean;
}

export type RepoDto = FireStoreRepo;
