import type { ReactElement } from 'react';

export interface IResourceService {
  useResource(): [boolean, ReactElement | null];
}
