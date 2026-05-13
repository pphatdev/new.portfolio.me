/**
 * Example interface for a User object
 */
export interface IListResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}