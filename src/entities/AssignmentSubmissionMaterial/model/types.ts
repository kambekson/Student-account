import { BaseFilter, ServiceFile, UUID } from "@/entities/Common";

export interface AssignmentSubmissionMaterial {
  id: UUID;
  submissionId: UUID;
  schoolId: UUID;
  materialFile?: ServiceFile;
  order: number;
}

export interface AssignmentSubmissionMaterialCreation {
  submissionId: UUID;
  schoolId: UUID;
  name: string;
}

export interface AssignmentSubmissionMaterialFilter extends BaseFilter {
  assignmentSubmissionId: UUID;
}
