"use client"

import {ReactNode, useState} from "react";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown, Folder} from "lucide-react";

type Props = {
	currentLocation: DocumentLocation;
	setCurrentLocation: (location: DocumentLocation) => void;
	locations: DocumentLocation[]
}

export type DocumentLocation = {
	id: string | null;
	label: string;
}

const rootLocation = {id: null, label: ""};

export default function DocumentLocationInput({currentLocation, setCurrentLocation, locations}: Props): ReactNode {

	const [open, setOpen] = useState<boolean>(false);

	function setNewLocation(newLocation: DocumentLocation) {
		setCurrentLocation(newLocation === currentLocation ? rootLocation : newLocation)
		setOpen(false);
	}

	return (
		<div>
			<Label>
				Categoría
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant={"outline"} className={"flex flex-row justify-between w-[450px]"}>
						<div className={"flex flex-row gap-2 items-center"}>
							<Folder/>
							{currentLocation.label}
						</div>
						<ChevronsUpDown/>
					</Button>
				</PopoverTrigger>
				<PopoverContent align={"start"} className="w-[450px] p-0">
					<Command>
						<CommandInput/>
						<CommandList>
							<CommandEmpty>Categoría no encontrada</CommandEmpty>
							<CommandGroup>
								{locations.map((item: DocumentLocation): ReactNode => {
									return (
										<CommandItem
											key={item.id}
											onSelect={() => setNewLocation(item)}
										><Folder/>{item.label}</CommandItem>)
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)

}