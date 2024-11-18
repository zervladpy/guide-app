"use client"

import {JSX, useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

type CollapsibleItemProps = {
    defaultOpen?: boolean | null;
    trigger: JSX.Element;
    children: JSX.Element;
}

function CollapsibleItem({defaultOpen, trigger, children}: CollapsibleItemProps): JSX.Element {

    const [open, setOpen] = useState<boolean>(defaultOpen ?? false);

    function handleOpen() {
        setOpen(!open);
    }

    return (
        <Collapsible open={open} onOpenChange={handleOpen}>
            <CollapsibleTrigger asChild>{trigger}</CollapsibleTrigger>
            <CollapsibleContent>
                {children}
            </CollapsibleContent>
        </Collapsible>
    )

}

export {CollapsibleItem}