//this is a custom hook for fetching data from the api
"use client";
import { toJSONString } from '@/shared/utils/json';
import { useState, useEffect } from 'react';

export const useFetch = (fetchFn, params = {}, options = {}) => {
    const {
        enabled = true,
        autoFetch = true,
        onSuccess,
        onError,
    } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(autoFetch && enabled);
    const [error, setError] = useState(null);

    const executeFetch = async (overrideParams = {}) => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetchFn({ ...params, ...overrideParams });

            setData(res);
            onSuccess?.(res);

            return res;
        } catch (err) {
            const errorMessage = err?.message || 'An error occurred';
            setError(errorMessage);
            onError?.(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch && enabled) {
            executeFetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toJSONString(params), enabled, autoFetch]);

    return {
        data,
        loading,
        error,
        refetch: executeFetch,
        setData,
    };
};