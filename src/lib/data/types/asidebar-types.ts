type AsidePost = {
  id: string
  title: string
}

type AsideCategory = {
  id: number
  path: string
  title: string
  subCategories: AsideCategory[]
  posts: AsidePost[]
}

export type { AsidePost, AsideCategory }
