import {JSX} from "react";
import {SidebarMenuButton} from "@/components/ui/sidebar";
import Link from "next/link";

type RecentChangesItemProps = {
    href: string;
    label: string;
    changeType: "C" | "M"
}

function RecentChangesItem({href, label, changeType}: RecentChangesItemProps): JSX.Element {

    return (
        <SidebarMenuButton asChild>
            <Link href={href} className={"flex flex-row justify-between"}>
                <div>
                    {label}
                </div>
                {changeType}
            </Link>
        </SidebarMenuButton>
    )

}

export {RecentChangesItem}