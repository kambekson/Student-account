import React, { FC } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("Баллы")}</TableCell>
              {!isPortrait && <TableCell>{t("Тип операции")}</TableCell>}
              {!isPortrait && <TableCell>{t("Инициатор")}</TableCell>}
              <TableCell>{t("Дата")}</TableCell>
              <TableCell>{t("Задание")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {transaction.points > 0
                    ? `+${transaction.points}`
                    : transaction.points}
                </TableCell>

                {!isPortrait && (
                  <TableCell>
                    {renderTransactionType(transaction.type, t)}
                  </TableCell>
                )}

                {!isPortrait && (
                  <TableCell>
                    {transaction.initiator.firstName}{" "}
                    {transaction.initiator.lastName}
                  </TableCell>
                )}

                <TableCell>
                  {format(new Date(transaction.createdAt), "dd.MM.yyyy HH:mm")}
                </TableCell>

                <TableCell>
                  {transaction.assignmentSubmission
                    ? transaction.assignmentSubmission.scheduledAssignment
                        .assignmentSnapshot.name
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" py={2}>
        {(isLoading || isFetchingNextPage) && (
          <div>
            <CircularProgress color="primary" size={30} />
          </div>
        )}
      </Box>

      {hasNextPage && !isFetchingNextPage && (
        <Box ref={loaderRef} display="flex" justifyContent="center" py={2}>
          <Typography variant="body2" color="textSecondary">
            {t("Прокрутите вниз для загрузки")}
          </Typography>
        </Box>
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
