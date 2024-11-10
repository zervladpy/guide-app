
import { Category } from "../../types/types"
import { prisma } from "../prisma"

const categories = prisma.category

type CategoryAsideDto = {
    id: number,
    title: string,
    childs: CategoryAsideDto[]
}

const getCategories = async (): Promise<{}[]> => {
    return await categories.findMany({
        where: { parentId: null },
        include: {
            children: { select: { id: true, title: true, children: true } }
        }
    })
}

export type { CategoryAsideDto }

export { getCategories }