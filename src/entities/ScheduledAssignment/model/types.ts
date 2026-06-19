import { StudentAssignmentSubmission } from "@/entities/AssignmentSubmission";
import { BaseFilter, UUID } from "@/entities/Common";

export enum AssignmentType {
  HOMEWORK = "homework",
  CLASSWORK = "classwork",
  TEST = "test",
}

export interface Assignment {
  id: UUID;
  name: string;
  description?: string;
  order: number;
  maxPoints: number;
  type: AssignmentType;
  schoolId: UUID;
  lessonId: UUID;
}

export interface ScheduledAssignment {
  id: UUID;
  assignment: Assignment;
  assignmentSnapshot: AssignmentSnapshot;
  scheduledLessonId: UUID;
  deadline?: Date;
  schoolId: UUID;
  studentAssignmentSubmission?: StudentAssignmentSubmission;
}

export interface MiniScheduledAssignment {
  id: UUID;
  assignmentSnapshot: AssignmentSnapshot;
}

export interface AssignmentSnapshot {
  name: string;
  description?: string | null;
  maxPoints: number;
  type: AssignmentType;
}

export interface ScheduledAssignmentFilter extends BaseFilter {
  schoolId: UUID;
  assignmentId?: UUID;
  scheduledLessonId?: UUID;
}
