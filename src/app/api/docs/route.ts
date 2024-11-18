import {MinimalDocumentModel} from "../../../../types/models/document-model";
import {document_db} from "../../../../data/document-dao";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

async function GET(): Promise<Response> {

	let response = null

	try {
		const data: MinimalDocumentModel[] = await document_db.get_documents()
		response = new Response(JSON.stringify(data), {status: 200})
	} catch (e) {
		response = new Response(JSON.stringify(e), {status: 500})
	}

	return response;
}

async function POST(req: Request): Promise<Response> {

	const session: Session | null = await getServerSession(authOptions)

	console.log(session)

	if (!session) {
		return new Response("Unauthorized", {status: 401})
	}

	let data = null

	try {
		data = await req.json()
		console.log("data: " + data.toString())
		/// look to contain parameters
	} catch (e) {
		console.log(e)
		return new Response("Bad Request", {status: 400})
	}

	try {
		await document_db.create({
			title: data.title,
			parent_id: data.parent_id ?? null,
			content: data.content ?? "",
			published: data.published ?? false,
			author_id: session.user.id
		})

		return new Response("Created", {status: 201,})
	} catch (e) {
		return new Response("Bad Request", {status: 400})
	}
}

export {GET, POST}