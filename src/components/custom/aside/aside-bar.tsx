import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent } from "@/components/ui/popover"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "@/components/ui/sidebar"
import { CategoryAsideDto, getCategories } from "@/lib/data/db/queries/category-query"
import { Plus } from "lucide-react"
import Link from "next/link"

const recent: { title: string, href: string }[] = [
    { title: "Vexor", href: "/naves/vexor" },
    { title: "Rateo", href: "/rateo" },
    { title: "Guia Pobres", href: "/guia-pobres" },
]

const getTree = async () => {
    return getCategories()
}

const AsideBar = async () => {

    const data = await getCategories();

    return (
        <Sidebar>
            <SidebarHeader>
                <Input placeholder="Buscar" />
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <Recent items={recent} />
                <Items items={data} />
            </SidebarContent>
        </Sidebar >
    )
}

const Recent = ({ items }: { items: { title: string, href: string }[] }) => {

    if (items.length === 0) return

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Cambios Recientes
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href}>{item.title}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

// Function to structure categories by parent-child relationship
const buildCategoryTree = (items: CategoryAsideDto[]) => {
    const map = new Map<number, CategoryAsideDto & { subcategories: CategoryAsideDto[] }>();
    items.forEach((item) => {
        map.set(item.id, { ...item, subcategories: [] });
    });

    const tree: CategoryAsideDto[] = [];
    items.forEach((item) => {
        if (item.parentId && map.has(item.parentId)) {
            map.get(item.parentId)?.subcategories.push(map.get(item.id) as CategoryAsideDto);
        } else {
            tree.push(map.get(item.id) as CategoryAsideDto);
        }
    });
    return tree;
};

// Recursive component for displaying categories and nested posts
const CategoryItem = ({ category }: { category: CategoryAsideDto }) => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <span>{category.title}</span>
            </SidebarMenuButton>

            {/* Display posts */}
            {category.posts.length > 0 && (
                <SidebarMenu>
                    {category.posts.map((post) => (
                        <SidebarMenuItem key={post.id}>
                            <SidebarMenuButton asChild>
                                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            )}

            {/* Display subcategories */}
            {category.subcategories && category.subcategories.length > 0 && (
                <SidebarMenu>
                    {category.subcategories.map((subcategory) => (
                        <CategoryItem key={subcategory.id} category={subcategory} />
                    ))}
                </SidebarMenu>
            )}
        </SidebarMenuItem>
    );
};

const Items = ({ items }: { items: CategoryAsideDto[] }) => {
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarGroupLabel>Guías</SidebarGroupLabel>
                <SidebarGroupAction>
                    <Plus />
                </SidebarGroupAction>
                <SidebarMenu>
                    {tree.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}


export { AsideBar }