export type UserType = {
  _id?: string;
  token?: string;
  displayName: string;
  email: string;
  photoURL: string;
  coins?: number;
  createdAt?: Date;
};
