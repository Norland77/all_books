export interface IUser {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  country: string;
  avatar: string;
  role: {
    id: number | undefined;
    name: string | undefined;
  };
  gender: {
    id: number | undefined;
    name: string | undefined;
  };
  createdAt: Date;
  updatedAt: Date;
}
