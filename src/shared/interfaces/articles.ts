import { IBaseResponse, IListResponse } from ".";
import { Tag } from "./projects"; // Assuming Tag is shared, or we can redefine it

export interface Author {
    name: string;
    profile: string;
    url: string;
}

export interface ArticleStats {
    views: number;
    readingMins: number;
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    description: string;
    tags: Tag[];
    authors: Author[];
    thumbnail: string;
    published: boolean;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    filePath: string;
    stats?: ArticleStats;
}

export type IArticleListResponse = IListResponse<Article>;
export type IArticleDetailResponse = IBaseResponse<Article>;
