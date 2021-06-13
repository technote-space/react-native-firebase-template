import { Repo as GitHubRepo } from 'domain/shared/github/entity/repo';
import { Repo as FireStoreRepo } from 'domain/shared/firestore/entity/repo';

export type Repo = GitHubRepo & {
  isEnabled: boolean;
}

export type RepoDto = FireStoreRepo;
