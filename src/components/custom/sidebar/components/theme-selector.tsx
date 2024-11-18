"use client"

import {JSX} from "react";
import {SidebarFooter, SidebarMenu, SidebarMenuButton} from "@/components/ui/sidebar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "react-day-picker";


function ThemeSelector(): JSX.Element {

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuButton asChild>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={"flex flex-row justify-between"}>
                                Tema
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Claro</DropdownMenuItem>
                            <DropdownMenuItem>Oscuro</DropdownMenuItem>
                            <DropdownMenuItem>Sistema</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuButton>
            </SidebarMenu>
        </SidebarFooter>
    )

}

export {ThemeSelector}