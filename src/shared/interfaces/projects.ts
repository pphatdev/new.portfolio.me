import { IListResponse } from ".";

export interface Contributor {
    id: number
    name: string
    profile: string
    url: string
    bio: string
    avatarUrl: string
    socialLinks: string[]
    status: number
    createdAt: string
    updatedAt: string
}

export interface Tag {
    id: number
    tag: string
    description: string
}

export interface Project {
    id: string
    title: string
    slug: string
    description: string
    tags: Tag[]
    contributors: Contributor[]
    languages: string[]
    thumbnail: string
    published: boolean
    createdAt: string
    updatedAt: string
}

export interface IProjectListResponse extends IListResponse<Project> { }