import { Charity } from './charity';
import { User } from './user';
export class Favorite {
  _id: string;
  user: User;
  charities: Charity[];
  createdAt: string;
  updatedAt: string;
}
