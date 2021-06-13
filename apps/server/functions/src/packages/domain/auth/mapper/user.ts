import type { User as EntityUser } from 'domain/shared/auth/entity/user';
import type { User } from 'domain/auth/dto/user';

export interface IUserMapper {
  fromEntity(user: EntityUser | null): User | null;
}
