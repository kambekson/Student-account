import { BaseFilter, UUID } from "@/entities/Common";
import { MiniScheduledAssignment } from "@/entities/ScheduledAssignment";

export enum AssignmentSubmissionStatus {
  ATTACHED = "attached",
  EVALUATED = "evaluated",
  ON_REVISION = "onRevision",
}

export interface AssignmentSubmission {
  id: UUID;
  scheduledAssignmentId: UUID;
  description?: string;
  feedback?: string;
  points: number;
  schoolId: UUID;
  status: AssignmentSubmissionStatus;
  studentId: UUID;
  submittedAt?: Date;
  revisedAt?: Date;
  teacherId?: UUID;
}

export interface MiniAssignmentSubmission {
  id: UUID;
  scheduledAssignment: MiniScheduledAssignment;
}

export interface AssignmentSubmissionCreation {
  scheduledAssignmentId: UUID;
  description: string;
  schoolId: UUID;
}

export interface AssignmentSubmissionUpdate {
  description?: string;
  isRevision?: boolean;
}

export enum AssignmentSubmissionEvaluationStatus {
  evaluate = "evaluate",
  revise = "revise",
}

export interface AssignmentSubmissionEvaluation {
  status: AssignmentSubmissionEvaluationStatus;
  feedback?: string;
  points?: number;
  submissionId?: UUID;
}

export interface StudentAssignmentSubmission {
  id: UUID;
  status: AssignmentSubmissionStatus;
  points: number;
}

export interface AssignmentSubmissionFilter extends BaseFilter {
  scheduledAssignmentId?: UUID;
  studentId?: UUID;
}
