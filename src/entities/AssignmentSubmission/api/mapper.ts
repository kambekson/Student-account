import {
  AssignmentSubmission,
  AssignmentSubmissionCreation,
  AssignmentSubmissionEvaluation,
  AssignmentSubmissionStatus,
  AssignmentSubmissionUpdate,
  MiniAssignmentSubmission,
  StudentAssignmentSubmission,
} from "@/entities/AssignmentSubmission";
import { Components } from "types/openapi";
import BaseMapper from "@/entities/Common/api/mapper";
import { ScheduledAssignmentMapper } from "@/entities/ScheduledAssignment/api/mapper";

export class AssignmentSubmissionMapper {
  static toAssignmentSubmissionStatus(
    apiStatus: Components.Schemas.AssignmentSubmissionStatus
  ): AssignmentSubmissionStatus {
    const statusMap: Record<
      Components.Schemas.AssignmentSubmissionStatus,
      AssignmentSubmissionStatus
    > = {
      attached: AssignmentSubmissionStatus.ATTACHED,
      evaluated: AssignmentSubmissionStatus.EVALUATED,
      onRevision: AssignmentSubmissionStatus.ON_REVISION,
    };

    const mappedStatus = statusMap[apiStatus];
    if (!mappedStatus) {
      throw new Error(`Unknown assignment submission status: ${apiStatus}`);
    }
    return mappedStatus;
  }

  static toAssignmentSubmission(
    apiResponse: Components.Schemas.AssignmentSubmission
  ): AssignmentSubmission {
    return {
      id: apiResponse.id,
      scheduledAssignmentId: apiResponse.scheduledAssignmentId,
      description: apiResponse.description || undefined,
      feedback: apiResponse.feedback || undefined,
      points: apiResponse.points,
      schoolId: apiResponse.schoolId,
      status: AssignmentSubmissionMapper.toAssignmentSubmissionStatus(
        apiResponse.status
      ),
      studentId: apiResponse.student.id,
      submittedAt: BaseMapper.toDate(apiResponse.submittedAt),
      revisedAt: BaseMapper.toDate(apiResponse.revisedAt),
      teacherId: apiResponse.teacherId,
    };
  }

  static toMiniAssignmentSubmission(
    apiResponse: Components.Schemas.MiniAssignmentSubmission
  ): MiniAssignmentSubmission {
    return {
      id: apiResponse.id,
      scheduledAssignment: ScheduledAssignmentMapper.toMiniScheduledAssignment(
        apiResponse.scheduledAssignment
      ),
    };
  }

  static toAssignmentSubmissionCreation(
    creation: AssignmentSubmissionCreation
  ): Components.Schemas.AssignmentSubmissionCreation {
    return {
      scheduledAssignmentId: creation.scheduledAssignmentId,
      description: creation.description,
      schoolId: creation.schoolId,
    };
  }

  static toAssignmentSubmissionUpdate(
    update: AssignmentSubmissionUpdate
  ): Components.Schemas.AssignmentSubmissionUpdate {
    return {
      description: update.description,
      isRevision: update.isRevision,
    };
  }

  static toAssignmentSubmissionEvaluation(
    evaluation: AssignmentSubmissionEvaluation
  ): Components.Schemas.AssignmentSubmissionEvaluation {
    return {
      points: evaluation.points,
      feedback: evaluation.feedback,
      status: evaluation.status,
    };
  }

  static toStudentAssignmentSubmission(
    apiResponse?: Components.Schemas.StudentAssignmentSubmission
  ): StudentAssignmentSubmission | undefined {
    if (!apiResponse) {
      return undefined;
    }

    return {
      id: apiResponse.id,
      status: AssignmentSubmissionMapper.toAssignmentSubmissionStatus(
        apiResponse.status
      ),
      points: apiResponse.points,
    };
  }
}
