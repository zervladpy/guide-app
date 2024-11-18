"use client"

import {JSX} from "react";
import {SidebarHeader, SidebarMenuButton} from "@/components/ui/sidebar";
import {SessionProvider, signIn, signOut, useSession} from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronsUpDown, LogIn, LogOut} from "lucide-react";
import {useIsMobile} from "@/hooks/use-mobile";
import {User} from "next-auth";

function ProfileHeader(): JSX.Element {

    return (
        <SessionProvider>
            <ProfileHeaderCard/>
        </SessionProvider>
    )

}

function ProfileHeaderCard(): JSX.Element {

    const isMobile = useIsMobile()
    const {data: session} = useSession()

    const user: User | undefined = session?.user

    /**
     * Default implementation remove
     * */
    if (!user) return (
        <SidebarHeader>
            <SidebarMenuButton size={"lg"} onClick={() => signIn()}><LogIn/> Iniciar Sesión</SidebarMenuButton>
        </SidebarHeader>
    );

    return (
        <SidebarHeader>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <ProfileCard user={user}/>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                        <ProfileCard user={user}/>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut/> Cerrar sesión
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </SidebarHeader>
    )

}

type ProfileCardProps = {
    user: User
}

function ProfileCard({user}: ProfileCardProps): JSX.Element {
    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image ?? ""} alt={user.name ?? ""}/>
                <AvatarFallback className="rounded-lg">A</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate font-mono">{user?.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4"/>
        </>
    )
}

export {ProfileHeader}
