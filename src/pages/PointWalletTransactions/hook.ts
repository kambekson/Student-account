import {
  PointWalletTransaction,
  PointWalletTransactionFilter,
} from "@/entities/PointWallet";
import { useInfiniteList } from "@/shared/lib/hooks/InfiniteList";
import { PointWalletTransactionAPI } from "@/entities/PointWallet";

const defaultQueryKey = "pointWalletTransactions";

interface UsePointWalletTransactionsOptions {
  pointWalletTransactionFilter: PointWalletTransactionFilter;
  enabled?: boolean;
}

export function usePointWalletTransactions({
  pointWalletTransactionFilter,
  enabled = true,
}: UsePointWalletTransactionsOptions) {
  const queryKey = [defaultQueryKey];

  const {
    items: pointWalletTransactions,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    loaderRef,
    refetch,
    totalItems,
  } = useInfiniteList<PointWalletTransaction, PointWalletTransactionFilter>({
    queryKey: [...queryKey, pointWalletTransactionFilter],
    fetchFn: PointWalletTransactionAPI.fetchPointWalletTransactions,
    filter: { ...pointWalletTransactionFilter },
    enabled,
  });

  return {
    pointWalletTransactions,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    totalItems,
    loaderRef,
    refetch,
  };
}
