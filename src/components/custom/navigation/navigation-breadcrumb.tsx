"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
    usePathname
} from "next/navigation"

const NavigationBreadCrumb = () => {

    const pathname = usePathname()

    const paths = pathname.split("/").slice(1)

    const lastPath = paths.length - 1

    return (

        <Breadcrumb className="flex justify-center">
            <BreadcrumbList>
                {paths.map((item, index) => {
                    const href = "/" + paths.slice(0, index + 1).join("/")
                    if (lastPath != index) {
                        return (
                            <div key={href} className="flex flex-row align-middle justify-center gap-2 items-center">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={href}>{item}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </div>
                        )
                    }

                    return (
                        <BreadcrumbPage key={href}>
                            {item}
                        </BreadcrumbPage>
                    )

                })}
            </BreadcrumbList>
        </Breadcrumb>

    )
}


export { NavigationBreadCrumb }