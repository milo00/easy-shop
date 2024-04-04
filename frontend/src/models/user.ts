export default interface IUser {
  id?: number;
  username?: string;
  password?: string;
  lastName?: string;
  firstName?: string;
  role?: Role;
}

export enum Role {
  USER,
  ADMIN,
}
