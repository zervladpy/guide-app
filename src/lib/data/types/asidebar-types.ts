type AsidePost = {
    id: string
    title: string
}

type AsideCategory = {
    id: number
    title: string
    subCategories: AsideCategory[]
    posts: AsidePost[]
}

export type { AsidePost, AsideCategory }