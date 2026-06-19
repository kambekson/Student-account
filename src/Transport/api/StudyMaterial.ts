import { Pagination } from "@/Common/Entity/Pagination";
import {
  StudyMaterial,
  StudyMaterialFilter,
} from "@/Common/Entity/Base/StudyMaterial";
import BaseMapper from "../mappers";
import { getClient } from "..";
import { Components, Paths } from "types/openapi";
import { StudyMaterialMapper } from "../mappers/studyMaterials";
import { UUID } from "@/Common/Entity/Base/Common";

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
