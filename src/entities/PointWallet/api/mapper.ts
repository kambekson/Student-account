import {
  PointWalletTransaction,
  PointWalletTransactionType,
} from "@/entities/PointWallet";
import { Components } from "types/openapi";
import { UserMapper } from "@/entities/User/api/mapper";
import BaseMapper from "@/entities/Common/api/mapper";
import { AssignmentSubmissionMapper } from "@/entities/AssignmentSubmission/api/mapper";

export class PointWalletTransactionMapper {
  static toPointWalletTransactionType(
    apiType: Components.Schemas.PointWalletTransactionType
  ): PointWalletTransactionType {
    const typeMap: Record<
      Components.Schemas.PointWalletTransactionType,
      PointWalletTransactionType
    > = {
      initialCredit: PointWalletTransactionType.INITIAL_CREDIT,
      adjustmentCredit: PointWalletTransactionType.ADJUSTMENT_CREDIT,
      adjustmentDebit: PointWalletTransactionType.ADJUSTMENT_DEBIT,
      manualDebit: PointWalletTransactionType.MANUAL_DEBIT,
      manualCredit: PointWalletTransactionType.MANUAL_CREDIT,
    };

    const mappedType = typeMap[apiType];
    if (!mappedType) {
      throw new Error(`Unknown assignment type: ${apiType}`);
    }
    return mappedType;
  }

  static toPointWalletTransaction(
    apiResponse: Components.Schemas.PointWalletTransaction
  ): PointWalletTransaction {
    return {
      id: apiResponse.id,
      points: apiResponse.points,
      type: PointWalletTransactionMapper.toPointWalletTransactionType(
        apiResponse.type
      ),
      pointWalletId: apiResponse.pointWalletId,
      initiator: UserMapper.toMiniUser(apiResponse.initiator),
      createdAt: BaseMapper.toDate(apiResponse.createdAt)!,
      assignmentSubmission: apiResponse.assignmentSubmission
        ? AssignmentSubmissionMapper.toMiniAssignmentSubmission(
            apiResponse.assignmentSubmission
          )
        : undefined,
    };
  }
}
