export interface IUser {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  country: string;
  avatar: string;
  role: string[];
  createdAt: Date;
}
