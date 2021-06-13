import type { IComponentService } from 'domain/shared/component/service';
import type { PropsWithChildren, ReactElement, ReactNode, VFC } from 'react';
import React from 'react';

export abstract class ComponentService<P = {}> implements IComponentService<P> {
  private readonly __component: VFC<P>;

  protected constructor() {
    this.__component = this.getComponent();
  }

  protected abstract getComponent(): VFC<P>;

  public render(props: P, children?: ReactNode): ReactElement {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = this.__component as VFC<PropsWithChildren<any>>;
    return <Component {...props}>
      {children}
    </Component>;
  }
}
