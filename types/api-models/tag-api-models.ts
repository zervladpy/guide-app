/// Requests

type TagApiCreateBody = {
    name: string;
    path: string;
    color: string;
}

type TagApiUpdateBody = {
    name?: string | null;
    path?: string | null;
    color?: string | null;
}

/// Responses

type TagApiResponseBody = {
    id: string;
    name: string;
    path: string;
    color: string;
}

export type {
    TagApiCreateBody,
    TagApiUpdateBody,
    TagApiResponseBody,
}