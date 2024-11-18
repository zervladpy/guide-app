import { prisma } from "@/lib/data/db/prisma";
import { Category } from "@/lib/data/types/types";

type GetAllCategoriesProps = {
  parent_id?: number | null | undefined
}

export async function getCategories({ parent_id }: GetAllCategoriesProps): Promise<Category[]> {

  return prisma.category.findMany({
    where: { parentId: parent_id },
    select: { id: true, title: true, pathName: true }
  });

}

type CreateCategory = {
  title: string,
}

export async function getCategoryIdFromPath({ path }: { path: string }) {

  return prisma.category.findUnique({
    where: { pathName: path },
    select: { id: true }
  })

}

export async function createCategory({
  parent_id,
  data
}: {
  parent_id?: number | null,
  data: CreateCategory
}): Promise<Category> {

  return prisma.category.create({
    data: {
      parentId: parent_id,
      title: data.title,
      pathName: data.title.toLowerCase().split(" ").join("_")
    }
  }).then((value) => value)

}

export async function deleteCategory({ id }: { id: string }) {

}
