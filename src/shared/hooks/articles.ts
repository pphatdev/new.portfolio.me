import { useState, useEffect } from 'react';
import { IArticleListResponse } from '../interfaces/articles';

export interface FetchArticlesOptions {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
    tags?: string;
    authors?: string;
}

export const useArticles = (options: FetchArticlesOptions = {}) => {
    const [articles, setArticles] = useState<IArticleListResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams();
            if (options.page) query.append('page', options.page.toString());
            if (options.limit) query.append('limit', options.limit.toString());
            if (options.search) query.append('search', options.search);
            if (options.sort) query.append('sort', options.sort);
            if (options.order) query.append('order', options.order);
            if (options.tags) query.append('tags', options.tags);
            if (options.authors) query.append('authors', options.authors);

            const queryString = query.toString();
            const url = `/api/articles${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url, {
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            setArticles(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch articles');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [options.page, options.limit, options.search, options.sort, options.order, options.tags, options.authors]);

    return { articles, loading, error, refetch: fetchArticles };
};
