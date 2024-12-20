import {TagModel} from "./tag-model";
import {UserModel} from "./user-model";

/**
 * From **Datasource** model
 * */
type DocumentModel = {
    /**
     * **UUID** generated value
     * */
    id: string;
    /**
     *
     * */
    title: string;
    /**
     * **HTML** content
     * */
    content: string;
    /**
     * Publication state
     * */
    published: boolean;
    /**
     * Creation date. **Autogenerated**
     * */
    created_at: Date;
    /**
     * Update date. **Autogenerated**
     * */
    updated_at: Date;
    /**
     * Used for *href* generation should be **snake_case** and **UNIQUE**
     * */
    path: string;
    /**
     * Guide depends on
     * */
    parent_id?: string | null;
    /**
     * Author
     * */
    author: UserModel;
    /**
     * Documents that depend on this
     * */
    sub_documents: DocumentModel[];
    /**
     * **NOT IMPLEMENTED YET**
     * */
    tags: TagModel[]
};

/**
 * Used for tree build
 * */
type MinimalDocumentModel = {
    id: string;
    title: string;
    path: string;
    parent_id?: string | null;
    sub_documents: MinimalDocumentModel[];
    updated_at: Date;
    published: boolean;
}

export type {DocumentModel, MinimalDocumentModel};