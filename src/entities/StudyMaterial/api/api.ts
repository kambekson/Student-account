import { Pagination } from "@/entities/Common";
import {
  StudyMaterial,
  StudyMaterialFilter,
} from "@/entities/StudyMaterial";
import BaseMapper from "@/entities/Common/api/mapper";
import { getClient } from "@/shared/api/base";
import { Components, Paths } from "types/openapi";
import { StudyMaterialMapper } from "@/entities/StudyMaterial/api/mapper";
import { UUID } from "@/entities/Common";

export default class StudyMaterialAPI {
  static async fetchStudyMaterials(
    filter: StudyMaterialFilter
  ): Promise<Pagination<StudyMaterial>> {
    const client = await getClient();
    const response = await client.getStudyMaterials(filter);

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetStudyMaterials.Responses.$200,
      StudyMaterialMapper.toStudyMaterial
    );
  }

  static async fetchStudyMaterialById(id: UUID): Promise<StudyMaterial> {
    const client = await getClient();
    const response = await client.getStudyMaterial(id);

    return StudyMaterialMapper.toStudyMaterial(
      response.data as Components.Schemas.StudyMaterial
    );
  }
}
