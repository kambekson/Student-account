import { Components } from "types/openapi";
import BaseMapper from ".";
import {
  Assignment,
  AssignmentSnapshot,
  AssignmentType,
  MiniScheduledAssignment,
  ScheduledAssignment,
} from "@/Common/Entity/Base/ScheduledAssignment";
import { AssignmentSubmissionMapper } from "./assignmentSubmissions";

export class ScheduledAssignmentMapper {
  static toAssignmentType(
    apiType: Components.Schemas.AssignmentType
  ): AssignmentType {
    const typeMap: Record<Components.Schemas.AssignmentType, AssignmentType> = {
      homework: AssignmentType.HOMEWORK,
      classwork: AssignmentType.CLASSWORK,
      test: AssignmentType.TEST,
    };

    const mappedType = typeMap[apiType];
    if (!mappedType) {
      throw new Error(`Unknown assignment type: ${apiType}`);
    }
    return mappedType;
  }

  static toAssignment(apiResponse: Components.Schemas.Assignment): Assignment {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      description: apiResponse.description,
      order: apiResponse.order,
      maxPoints: apiResponse.maxPoints,
      type: ScheduledAssignmentMapper.toAssignmentType(apiResponse.type),
      schoolId: apiResponse.schoolId,
      lessonId: apiResponse.lessonId,
    };
  }

  static toAssignmentSnapshot(
    apiResponse: Components.Schemas.AssignmentSnapshot
  ): AssignmentSnapshot {
    return {
      name: apiResponse.name,
      description: apiResponse.description,
      maxPoints: apiResponse.maxPoints,
      type: ScheduledAssignmentMapper.toAssignmentType(apiResponse.type),
    };
  }

  static toScheduledAssignment(
    apiResponse: Components.Schemas.ScheduledAssignment
  ): ScheduledAssignment {
    return {
      id: apiResponse.id,
      assignment: ScheduledAssignmentMapper.toAssignment(
        apiResponse.assignment
      ),
      assignmentSnapshot: ScheduledAssignmentMapper.toAssignmentSnapshot(
        apiResponse.assignmentSnapshot
      ),
      scheduledLessonId: apiResponse.scheduledLessonId,
      deadline: BaseMapper.toDate(apiResponse.deadline),
      schoolId: apiResponse.schoolId,
      studentAssignmentSubmission:
        AssignmentSubmissionMapper.toStudentAssignmentSubmission(
          apiResponse.studentAssignmentSubmission
        ),
    };
  }

  static toMiniScheduledAssignment(
    apiResponse: Components.Schemas.MiniScheduledAssignment
  ): MiniScheduledAssignment {
    return {
      id: apiResponse.id,
      assignmentSnapshot: ScheduledAssignmentMapper.toAssignmentSnapshot(
        apiResponse.assignmentSnapshot
      ),
    };
  }
}
