import {
  PointWalletTransaction,
  PointWalletTransactionFilter,
} from "@/Common/Entity/Base/PointWalletTransaction";
import { useInfiniteList } from "@/Domain/CustomHooks/InfiniteList";
import PointWalletTransactionAPI from "@/Transport/api/PointWalletTransaction";

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
