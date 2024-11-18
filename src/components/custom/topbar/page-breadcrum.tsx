import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

type PageBreadcrumbProps = {
  path: string;
  split?: string;
}

export default function PageBreadcrumb({ path, split }: PageBreadcrumbProps) {
  /// default path split
  split ??= "/"

  const paths: string[] = path.split(split).slice(1)

  return (
    <Breadcrumb className="flex justify-center">
      <BreadcrumbList>
        {paths.map((item, index) => {

          const href = "/" + paths.slice(0, index + 1).join(split)
          if (paths.length - 1 == index) {
            return (
              <BreadcrumbPage key={href}>{item}</BreadcrumbPage>
            )
          }
          return (
            <div key={href} className="flex flex-row align-middle justify-center gap-2 items-center">
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>{item}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )

}
