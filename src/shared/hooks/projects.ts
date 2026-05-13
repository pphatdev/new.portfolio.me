import { useState, useEffect } from 'react';
import { IProjectListResponse } from '../interfaces/projects';

export interface FetchProjectsOptions {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}

export const useProjects = (options: FetchProjectsOptions = {}) => {
    const [projects, setProjects] = useState<IProjectListResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams();
            if (options.page) query.append('page', options.page.toString());
            if (options.limit) query.append('limit', options.limit.toString());
            if (options.search) query.append('search', options.search);
            if (options.sort) query.append('sort', options.sort);
            if (options.order) query.append('order', options.order);

            const queryString = query.toString();
            const url = `/api/projects${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url, {
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            setProjects(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch projects');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [options.page, options.limit, options.search, options.sort, options.order]);

    return { projects, loading, error, refetch: fetchProjects };
};