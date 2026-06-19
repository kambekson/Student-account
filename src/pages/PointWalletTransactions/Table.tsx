import React, { FC } from "react";
import { format } from "date-fns";

import { PointWalletTransaction } from "@/entities/PointWallet";
import { useIsPortrait } from "@/shared/lib/hooks/isPortrait";
import { useTranslation } from "react-i18next";

interface PointWalletTransactionsTableProps {
  transactions: PointWalletTransaction[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  loaderRef: React.RefObject<HTMLDivElement>;
}

export const PointWalletTransactionsTable: FC<
  PointWalletTransactionsTableProps
> = ({
  transactions,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  loaderRef,
}) => {
  const isPortrait = useIsPortrait();
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">{t("Баллы")}</th>
              {!isPortrait && <th className="px-6 py-3 font-semibold text-gray-700">{t("Тип операции")}</th>}
              {!isPortrait && <th className="px-6 py-3 font-semibold text-gray-700">{t("Инициатор")}</th>}
              <th className="px-6 py-3 font-semibold text-gray-700">{t("Дата")}</th>
              <th className="px-6 py-3 font-semibold text-gray-700">{t("Задание")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {transaction.points > 0
                    ? `+${transaction.points}`
                    : transaction.points}
                </td>

                {!isPortrait && (
                  <td className="px-6 py-4 text-gray-700">
                    {renderTransactionType(transaction.type, t)}
                  </td>
                )}

                {!isPortrait && (
                  <td className="px-6 py-4 text-gray-700">
                    {transaction.initiator.firstName}{" "}
                    {transaction.initiator.lastName}
                  </td>
                )}

                <td className="px-6 py-4 text-gray-700">
                  {format(new Date(transaction.createdAt), "dd.MM.yyyy HH:mm")}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {transaction.assignmentSubmission
                    ? transaction.assignmentSubmission.scheduledAssignment
                        .assignmentSnapshot.name
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center py-4">
        {(isLoading || isFetchingNextPage) && (
          <div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
          </div>
        )}
      </div>

      {hasNextPage && !isFetchingNextPage && (
        <div ref={loaderRef} className="flex justify-center py-4">
          <p className="text-sm text-gray-500">
            {t("Прокрутите вниз для загрузки")}
          </p>
        </div>
      )}
    </>
  );
};

function renderTransactionType(
  type: string,
  t: (text: string) => string
): string {
  switch (type) {
    case "initialCredit":
      return t("Первоначальная проверка задания");
    case "adjustmentCredit":
      return `${t("Перепроверка задания")} (${t("начисление")})`;
    case "adjustmentDebit":
      return `${t("Перепроверка задания")} (${t("списание")})`;
    case "manualDebit":
      return t("Ручное списание");
    case "manualCredit":
      return t("Ручное зачисление");
    default:
      return type;
  }
}
