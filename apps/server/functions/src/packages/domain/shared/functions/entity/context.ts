import type { CallableContext } from 'firebase-functions/lib/providers/https';

export type { CallableContext };
export type AuthedCallableContext = Omit<CallableContext, 'auth'> & Pick<Required<CallableContext>, 'auth'>;
