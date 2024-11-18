"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import PageBreadcrumb from "./page-breadcrum"

type PageTopNavigationProps = {
  sideNavigationTrigger?: ReactNode,
  pageSettingsTrigger?: ReactNode
}

export default function PageTopNavigation({
  sideNavigationTrigger,
  pageSettingsTrigger
}: PageTopNavigationProps) {

  const pathName = usePathname()

  return (
    <header className="w-full xl:max-w-screen-xl flex flex-row justify-between p-5">
      <div className="flex flex-row gap-5 align-middle justify-center">
        {sideNavigationTrigger}
        <PageBreadcrumb path={pathName} />
      </div>
      {pageSettingsTrigger}
    </header>
  )

}
