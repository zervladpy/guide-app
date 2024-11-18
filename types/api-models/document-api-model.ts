/// Requests

import {UserApiResponseBody} from "./user-api-models";

type DocumentApiCreateBody = {
    title: string;
    content: string;
    published?: boolean | null;
    parent_id?: string;
    tags?: string[] | null;
}

type DocumentApiUpdateBody = {
    title?: string | null;
    content?: string | null;
    published?: boolean | null;
    parent_id?: string | null;
    tags?: string[] | null;
}

/// Responses

type DocumentApiResponse = {
    id: string;
    title: string;
    path: string;
    parent_id?: string | null;
    sub_documents: DocumentApiResponse[];
    updated_at: Date;
    published: boolean;
}

type DocumentApiExtendedResponse = {
    id: string;
    title: string;
    content: string;
    path: string;
    sub_documents: DocumentApiResponse[];
    author: UserApiResponseBody
    updated_at: string;
    created_at: string;
}

export type {
    DocumentApiCreateBody,
    DocumentApiUpdateBody,
    DocumentApiResponse,
    DocumentApiExtendedResponse,
}