import { ReactNode } from "react"
import { NavigationBreadCrumb } from "./navigation-breadcrumb"

const NavigationBar = ({
    asideTrigger
}: {
    asideTrigger: ReactNode
}) => {

    const user = false

    return (
        <nav className="w-full xl:max-w-screen-xl flex flex-row justify-between p-5">
            {/** BreadCrumb */}
            <div className="flex flex-row gap-5 align-middle justify-center">
                {asideTrigger}
                <NavigationBreadCrumb />
            </div>
            {/** Settings Bar */}

            {/** User Account */}

        </nav>
    )
}

export { NavigationBar }