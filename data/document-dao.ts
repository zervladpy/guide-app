import {Prisma, PrismaClient} from "@prisma/client";
import {DocumentModel, MinimalDocumentModel} from "../types/models/document-model";
import {prisma} from "@/lib/data/db/prisma";
import {UserModel} from "../types/models/user-model";
import DocumentDelegate = Prisma.DocumentDelegate;

class DocumentDao {

	documents: DocumentDelegate

	constructor(db: PrismaClient) {
		this.documents = db.document;
	}

	async create(data: {
		title: string;
		content?: string | null;
		published?: boolean | null;
		parent_id?: string | null;
		author_id: string;
		tags?: string[] | null;
	}): Promise<string> {

		return this.documents.create({
			data: {
				path: data.title.split(" ").join("-").toLowerCase(),
				title: data.title,
				content: data.content ?? "",
				published: data.published ?? false,
				author_id: data.author_id,
				parent_id: data.parent_id
			}
		}).then((doc) => doc.id)
	}

	async update(data: {
		id: string;
		title?: string | undefined;
		content?: string | undefined;
		published?: boolean | undefined;
		parent_id?: string | undefined;
		tags?: string[] | undefined;
	}): Promise<DocumentModel> {

		return this.documents.update({
			where: {id: data.id},
			data: {
				path: data.title?.split(" ").join("-").toLowerCase(),
				title: data.title,
				content: data.content,
				published: data.published,
				parent_id: data.parent_id,
			},
			include: {
				author: {
					select: {id: true, name: true, image: true}
				},
				tags: true
			}
		}).then(this.mapDocument)
	}

	async delete(id: string): Promise<void> {
		this.documents.delete({where: {id}})
	}

	async get_document(data: {
		id?: string,
		path?: string,
	}): Promise<DocumentModel | null> {
		if (!data.id && !data.path) throw new Error("id or path is required");

		const where = data.id ? {id: data.id} : {path: data.path}

		return this.documents.findUnique({
			where: where,
			include: {
				author: {
					select: {id: true, name: true, image: true}
				},
				tags: true,
			}
		}).then((res) => {
			if (!res) return null;
			return this.mapDocument(res)
		})
	}

	async get_documents(): Promise<MinimalDocumentModel[]> {
		const docs = await this.documents.findMany({
			select: {
				id: true,
				title: true,
				path: true,
				published: true,
				parent_id: true,
				updated_at: true,
			},
		}).then((docs) => {
			return docs.map((doc) => {
				return {
					id: doc.id,
					title: doc.title,
					path: doc.path,
					parent_id: doc.parent_id,
					updated_at: doc.updated_at,
					published: doc.published,
				} as MinimalDocumentModel;
			})
		})

		return this.nestDocuments(docs)
	}

	private mapAuthor(data: { id: string, name: string | null, image: string | null }): UserModel {
		return {id: data.id, name: data.name ?? "", image: data.image ?? ""}
	}

	private mapDocument(
		data: {
			id: string;
			title: string;
			content: string;
			path: string;
			published: boolean;
			parent_id: string | null;
			author_id: string;
			created_at: Date;
			updated_at: Date;
			author: {
				id: string;
				name: string | null;
				image: string | null;
			},
			sub_documents?: DocumentModel[] | null;
			tags?: {
				id: string;
				name: string;
				path: string;
				color: string;
			}[] | null
		}): DocumentModel {

		return {
			id: data.id,
			title: data.title,
			content: data.content,
			path: data.path,
			published: data.published,
			created_at: data.created_at,
			updated_at: data.updated_at,
			sub_documents: data.sub_documents ?? [],
			tags: data.tags ?? [],
			author: this.mapAuthor(data.author),
		}
	}

	private nestDocuments(docs: MinimalDocumentModel[]): MinimalDocumentModel[] {
		// Create a map for quick access by id
		const docMap: { [id: string]: MinimalDocumentModel } = {};

		// Populate the map with document references
		docs.forEach(doc => {
			docMap[doc.id] = {...doc, sub_documents: []};
		});

		// Array to hold root level documents
		const nestedDocuments: MinimalDocumentModel[] = [];

		// Arrange documents by setting up parent-child relationships
		docs.forEach(doc => {
			if (doc.parent_id) {
				// If it has a parent, add to parent's sub_documents array
				const parent = docMap[doc.parent_id];
				if (parent) {
					parent.sub_documents.push(docMap[doc.id]);
				}
			} else {
				// If it has no parent_id, it is a root document
				nestedDocuments.push(docMap[doc.id]);
			}
		});

		return nestedDocuments;
	}

}

const document_db: DocumentDao = new DocumentDao(prisma)

export {document_db};