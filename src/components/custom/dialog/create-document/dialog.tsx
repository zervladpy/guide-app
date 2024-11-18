"use client"

import {ReactNode, useState} from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import DocumentLocationInput, {
	DocumentLocation
} from "@/components/custom/dialog/create-document/document-location-input";
import {DocumentNameInput} from "@/components/custom/dialog/create-document/document-name-input";
import {DocumentApiCreateBody, DocumentApiResponse} from "../../../../../types/api-models/document-api-model";
import {Button} from "@/components/ui/button";

type Props = {
	trigger: ReactNode;
	documents: DocumentApiResponse[];
}

export default function CreateDocumentDialog({trigger, documents}: Props): ReactNode {

	const [fileName, setFileName] = useState<string>("");
	const [currentLocation, setCurrentLocation] = useState<DocumentLocation>({id: null, label: ""})

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogTitle>Crear Documento</DialogTitle>
				<DialogDescription hidden>Añadir nuevo documento a la guía</DialogDescription>
				<DocumentNameInput
					value={fileName}
					setValue={setFileName}
				/>
				<DocumentLocationInput
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
					locations={mapLocations(documents)}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"ghost"}>Cancelar</Button>
					</DialogClose>
					<Button onClick={() => createDocument(currentLocation, fileName)}>Crear</Button>
				</DialogFooter>
			</DialogContent>

		</Dialog>
	)

}

async function createDocument(newDocumentLocation: DocumentLocation, fileName: string): Promise<void> {
	try {
		const url: string = "http://localhost:3000/api/docs"

		const body: DocumentApiCreateBody = {
			parent_id: newDocumentLocation.id ?? undefined,
			title: fileName,
			content: ""
		}

		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
		})
		console.log(response)
	} catch (e) {
		alert(`Could not create document: ${e}`)
	}
}

function mapLocations(documents: DocumentApiResponse[]): DocumentLocation[] {

	const locations: DocumentLocation[] = []

	function traverse(doc: DocumentApiResponse): void {
		const location: DocumentLocation = {id: doc.id, label: doc.title}
		locations.push(location)
		doc.sub_documents.forEach((doc) => traverse(doc));
	}

	documents.forEach(traverse);

	return locations;
}