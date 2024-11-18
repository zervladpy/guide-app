/**
 * Create category **POST** body
 * */
export type CreateCategory = {
    title: string;
    user_id: string;

    /**
     * By default, will be placed as root
     */
    path?: string | null;
}

/**
 * Internal API create guide **POST** body
 * */
export type CreateGuide = {
    title: string;
    user_id: string;
    content: string | null;

    /**
     * By default, will be placed as root
     */
    path?: string | null
}

/**
 * Internal API category **GET** body
 * */
export type CategoryResponseDto = {
    id: string;
    title: string;
    /**
     * Undefined if is on root path
     * */
    parent_id?: number | null;
    path: string;
    sub_categories: CategoryResponseDto[];
    guides: GuideResponseDto[];
}

/**
 * Internal API guide **GET** body
 * */
export type GuideResponseDto = {
    id: string;
    title: string;
    path: string;
    /**
     * Undefined if on root
     * */
    category_id?: string | null;
}
