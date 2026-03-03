

    export interface categoriesResponse {
    results: number
    metadata: Metadata
    data: categoriesTypes[]
    }

    export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    }

    export interface categoriesTypes {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
    }

