import { UserRole } from './user-role.interface';

export class UserDetail {
  username: string;
  password: string;
  roles: UserRole[];
}
