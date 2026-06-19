import { MiniAssignmentSubmission } from "@/entities/AssignmentSubmission";
import { BaseFilter, UUID } from "@/entities/Common";
import { MiniUser } from "@/entities/User";

export interface PointWalletTransaction {
  id: UUID;
  points: number;
  type: PointWalletTransactionType;
  pointWalletId: UUID;
  initiator: MiniUser;
  createdAt: Date;
  assignmentSubmission?: MiniAssignmentSubmission;
}

export enum PointWalletTransactionType {
  INITIAL_CREDIT = "initialCredit",
  ADJUSTMENT_CREDIT = "adjustmentCredit",
  ADJUSTMENT_DEBIT = "adjustmentDebit",
  MANUAL_DEBIT = "manualDebit",
  MANUAL_CREDIT = "manualCredit",
}

export interface PointWalletTransactionFilter extends BaseFilter {
  userId: UUID;
  walletId: UUID;
}
