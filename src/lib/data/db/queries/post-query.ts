import { prisma } from "../prisma";
import { BasicPostInfo } from "../../types/types";
const posts = prisma.post;

type GetAllPostsForCategoryProps = {
  category_id?: number | undefined
}

export async function getAllPostsForCategory(
  { category_id }: GetAllPostsForCategoryProps
): Promise<BasicPostInfo[]> {

  return posts.findMany({
    where: { categoryId: category_id },
    select: { id: true, title: true, published: true, updatedAt: true }
  })

}

type CreatePost = {
  category_id: number,
  title: string;
  content: string;
  published: boolean;
  author_id: string;
}

export function createPost({ category_id, title, content, published, author_id }: CreatePost) {

  return prisma.post.create({
    data: {
      id: title.toLowerCase().split(" ").join("_"),
      title, content, published, categoryId: category_id, authorId: author_id
    }
  })

}
