import { Components } from "types/openapi";
import { AssignmentSubmissionMaterial, AssignmentSubmissionMaterialCreation } from "@/entities/AssignmentSubmissionMaterial";
import BaseMapper from "@/entities/Common/api/mapper";

export class AssignmentSubmissionMaterialMapper {
  static toAssignmentSubmissionMaterial(
    apiResponse: Components.Schemas.AssignmentSubmissionMaterial
  ): AssignmentSubmissionMaterial {
    return {
        id: apiResponse.id,
        submissionId: apiResponse.submissionId,
        schoolId: apiResponse.schoolId,
        materialFile: apiResponse.materialFile && BaseMapper.toServiceFile(apiResponse.materialFile),
        order: apiResponse.order,
    };
  }

  static toAssignmentSubmissionMaterialCreation(
    creation: AssignmentSubmissionMaterialCreation
  ): Components.Schemas.AssignmentSubmissionMaterialCreation {
    return {
      schoolId: creation.schoolId,
      name: creation.name,
    };
  }
}
