import type { IUserMapper } from 'domain/auth/mapper/user';
import type { User as EntityUser } from 'domain/shared/auth/entity/user';
import type { User } from 'domain/auth/dto/user';

export class UserMapper implements IUserMapper {
  public fromEntity(user: EntityUser): User {
    return {
      login: user.login.value(),
      id: user.id.value(),
      avatarUrl: user.avatarUrl.value(),
      name: user.name.value(),
    };
  }
}
