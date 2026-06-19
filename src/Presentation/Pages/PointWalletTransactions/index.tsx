import React, { useEffect } from "react";

import Card from "../../Components/Card";

import "@/Presentation/Styles/pages/confirmExit.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useParams } from "react-router-dom";
import { usePointWalletTransactions } from "./hook";
import { PointWalletTransactionsTable } from "./Table";
import { useQueryClient } from "@tanstack/react-query";

const PointWalletTransactionsPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["pointWalletTransactions"] });
    };
  }, [id, queryClient]);

  const {
    pointWalletTransactions,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loaderRef,
  } = usePointWalletTransactions({
    pointWalletTransactionFilter: {
      page: 1,
      pageSize: 10,
      userId: user!.id,
      walletId: id!,
    },
  });

  return (
    <>
      <div className="page">
        <div
          className="main-grid"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div></div>
          <div>
            <Card>
              <PointWalletTransactionsTable
                transactions={pointWalletTransactions}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                loaderRef={loaderRef as any}
                isLoading={isLoading}
              />
            </Card>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default PointWalletTransactionsPage;
