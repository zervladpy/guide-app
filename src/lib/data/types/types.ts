/**
 * Default User definition
 * */
type User = {
  id: string;
  fullName: string;
  avatarUrl: string;
}

/**
 * Default Category definition
 * */
type Category = {
  id: number;
  title: string;
  pathName: string;
}

/**
 * Default Tag definition
 * */
type Tag = {
  id: number;
  title: string;
  pathName: string;
  color: string;
}

/**
 * Default Post definition
 * */
type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  category: Category;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  author: User;
}

/**
 * Basic Post information
 *  */
type BasicPostInfo = {
  id: string,
  title: string,
  published: boolean,
  updatedAt: Date
}

export type { User, Tag, Category, Post, BasicPostInfo }
