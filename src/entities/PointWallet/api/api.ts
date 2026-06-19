import {
  PointWalletTransaction,
  PointWalletTransactionFilter,
} from "@/entities/PointWallet";
import { Pagination } from "@/entities/Common";
import { getClient } from "@/shared/api/base";
import BaseMapper from "@/entities/Common/api/mapper";
import { Components } from "types/openapi";
import { PointWalletTransactionMapper } from "@/entities/PointWallet/api/mapper";

export default class PointWalletTransactionAPI {
  static async fetchPointWalletTransactions(
    filter: PointWalletTransactionFilter
  ): Promise<Pagination<PointWalletTransaction>> {
    const client = await getClient();
    const response = await client.userStudentWalletsTransactions(filter);

    return BaseMapper.paginationFromApi(
      response.data as Components.Responses.PointWalletTransactions,
      PointWalletTransactionMapper.toPointWalletTransaction
    );
  }
}
