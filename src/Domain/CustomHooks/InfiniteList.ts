import { BaseFilter } from "@/Common/Entity/Base/Common";
import { Pagination } from "@/Common/Entity/Pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef, useEffect } from "react";

interface UseInfiniteListProps<
  TData,
  TFilter extends BaseFilter,
  TError = unknown
> {
  queryKey: unknown[];
  fetchFn: (filter: TFilter) => Promise<Pagination<TData>>;
  filter: Omit<TFilter, "page" | "pageSize">;
  pageSize?: number;
  enabled?: boolean;
  observerOptions?: {
    threshold?: number;
    rootMargin?: string;
  };

  onSuccess?: (data: TData[]) => void;
  onError?: (error: TError) => void;
}

export function useInfiniteList<
  TData,
  TFilter extends BaseFilter,
  TError = unknown
>({
  queryKey,
  fetchFn,
  filter,
  pageSize = 20,
  enabled = true,
  observerOptions = { threshold: 0.1, rootMargin: "200px" },
  onSuccess,
  onError,
}: UseInfiniteListProps<TData, TFilter, TError>) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      try {
        const fullFilter = {
          ...filter,
          page: pageParam,
          pageSize,
        } as TFilter;

        return await fetchFn(fullFilter);
      } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.metadata) return undefined;
      const { page, totalPages } = lastPage.metadata;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled,
  });

  const safePages = data?.pages || [];
  const items = safePages.flatMap((page) => page?.items || []);
  const totalItems =
    safePages.length > 0 && safePages[safePages.length - 1]?.metadata
      ? safePages[safePages.length - 1].metadata.totalItems
      : 0;

  const loaderRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node || !hasNextPage || isFetchingNextPage) {
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      }, observerOptions);

      observer.observe(node);
      observerRef.current = observer;
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage, observerOptions]
  );

  useEffect(() => {
    if (items.length > 0 && onSuccess) {
      onSuccess(items);
    }
  }, [items, onSuccess]);

  useEffect(() => {
    if (isError && onError && error) {
      onError(error as TError);
    }
  }, [isError, error, onError]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    items,
    totalItems,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error: error as TError | null,
    hasNextPage: !!hasNextPage,
    fetchNextPage,
    loaderRef,
    refetch,
    pagination:
      safePages.length > 0
        ? safePages[safePages.length - 1]?.metadata
        : undefined,
  };
}
