export type UserType = {
  _id?: string;
  displayName: string;
  email: string;
  photoURL: string;
  coins?: number;
  createdAt?: Date;
};

export type RecipeListType = {
  _id: string;
  title: string;
  image: string;
  creatorEmail: string;
  country: string;
  purchasedBy: string[];
};

export type DocumentCountType = {
  count: number;
};

export type RecipeType = {
  _id: string;
  title: string;
  image: string;
  creatorEmail: string;
  country: string;
  purchasedBy: string[];
  createdAt: Date;
  video: string;
  reaction: string[];
  details: string;
  category: string;
};
