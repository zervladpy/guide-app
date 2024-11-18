import {JSX, Suspense} from "react";
import {
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub
} from "@/components/ui/sidebar";
import {ChevronRight, Plus} from "lucide-react";
import {DocumentApiResponse} from "../../../../../types/api-models/document-api-model";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import Link from "next/link";
import CreateDocumentDialog from "@/components/custom/dialog/create-document/dialog";

async function fetchData(): Promise<DocumentApiResponse[]> {

	const response = await fetch("http:localhost:3000/api/docs");

	return await response.json();

}


async function DocumentTree(): Promise<JSX.Element> {
	const documents: DocumentApiResponse[] = await fetchData();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Guías</SidebarGroupLabel>
			<CreateDocumentDialog
				trigger={<SidebarGroupAction><Plus/></SidebarGroupAction>}
				documents={documents}
			/>
			<Suspense fallback={<div>Loading...</div>}>
				<DocumentTreeContent documents={documents}/>
			</Suspense>
		</SidebarGroup>
	)
}

async function DocumentTreeContent({documents}: { documents: DocumentApiResponse[] }): Promise<JSX.Element> {
	return (
		<SidebarGroupContent>
			<SidebarMenu>
				{documents.map((document) => {
					return <Tree key={document.id} document={document} href={null}/>
				})}
			</SidebarMenu>
		</SidebarGroupContent>
	);

}

function Tree({document, href}: { document: DocumentApiResponse, href?: string | null }) {

	href ??= ""

	href += `/${document.path}`

	if (!document.sub_documents.length) {
		return (
			<SidebarMenuButton
				isActive={false}
				className="data-[active=true]:bg-transparent"
				asChild
			>
				<Link href={href}>{document.title}</Link>
			</SidebarMenuButton>
		)
	}
	return (
		<SidebarMenuItem>
			<Collapsible
				className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
				defaultOpen={false}
			>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton asChild>
						<Link href={href}>
							<ChevronRight className="transition-transform"/>
							{document.title}
						</Link>
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{document.sub_documents.map((subItem, index) => (
							<Tree key={index} document={subItem} href={href}/>
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</Collapsible>
		</SidebarMenuItem>
	)
}

export {DocumentTree}