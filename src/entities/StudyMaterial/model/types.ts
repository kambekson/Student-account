import { BaseFilter, ServiceFile, UUID } from "@/entities/Common";

export interface StudyMaterial {
  id: UUID;
  name: string;
  description?: string;
  schoolId: UUID;
  assignmentId?: UUID;
  materialFile?: ServiceFile;
  lessonId?: string;
  order: number;
}

export interface StudyMaterialFilter extends BaseFilter {
  schoolId: UUID,
  lessonId?: UUID,
  assignmentId?: UUID
}
