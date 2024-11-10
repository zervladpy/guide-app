type User = {
    id: string
    name: string
    avatarUrl: string
    posts: Post[]
}

type Author = {
    id: string
    name: string
    avatarUrl: string
}

type Post = {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    published: boolean
    author: Author
    content: string | null
    tags: Tag[]
}

type PostDto = {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    author: Author
    category: Category
    tags: Tag[]
}

type Tag = {
    id: number
    name: string
    color: string
    posts: Post[]
}

type Category = {
    id: number
    title: string
    posts: Post[]
    parent?: Category
    children: Category[]
}

export type {
    User,
    Author,
    Post,
    PostDto,
    Tag,
    Category,
}
