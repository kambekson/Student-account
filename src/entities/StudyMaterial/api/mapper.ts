import { StudyMaterial } from "@/entities/StudyMaterial";
import { Components } from "types/openapi";
import BaseMapper from "@/entities/Common/api/mapper";


export class StudyMaterialMapper {
  static toStudyMaterial(apiResponse: Components.Schemas.StudyMaterial): StudyMaterial {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      description: apiResponse.description,
      schoolId: apiResponse.schoolId,
      assignmentId: apiResponse.assignmentId,
      materialFile: apiResponse.materialFile ? BaseMapper.toServiceFile(apiResponse.materialFile) : undefined,
      lessonId: apiResponse.lessonId,
      order: apiResponse.order,
    };
  }  
}
