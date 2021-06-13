import type { ReactElement, ReactNode } from 'react';

export interface IComponentService<P = {}> {
  render(props: P, children?: ReactNode): ReactElement;
}
