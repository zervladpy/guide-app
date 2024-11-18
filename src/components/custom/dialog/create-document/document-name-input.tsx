import {ReactNode} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type Props = {
	value: string;
	setValue: (value: string) => void;
}


export function DocumentNameInput({value, setValue}: Props): ReactNode {

	const field_id: string = "name-filed";

	return (
		<div>
			<Label htmlFor={field_id}>
				Nombre
			</Label>
			<Input
				id={field_id}
				className={"w-[450px]"}
				type={"text"}
				onChange={({target}) => setValue(target.value)}
				value={value}
			/>
		</div>
	)

}