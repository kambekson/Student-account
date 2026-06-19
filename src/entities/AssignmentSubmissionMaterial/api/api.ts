import { AxiosResponse } from "axios";
import { Pagination } from "@/entities/Common";
import {
  AssignmentSubmissionMaterial,
  AssignmentSubmissionMaterialCreation,
  AssignmentSubmissionMaterialFilter,
} from "@/entities/AssignmentSubmissionMaterial";
import { Components } from "types/openapi";
import { getClient } from "@/shared/api/base";
import { AssignmentSubmissionMaterialMapper } from "./mapper";
import { UUID } from "@/entities/Common";
import { WithPutLink } from "@/entities/Common";
import BaseMapper from "@/entities/Common/api/mapper";

export default class AssignmentSubmissionMaterialAPI {
  static async fetchAssignmentSubmissionMaterials(
    filter: AssignmentSubmissionMaterialFilter
  ): Promise<Pagination<AssignmentSubmissionMaterial>> {
    const client = await getClient();
    const response = await client.getAssignmentSubmissionMaterials(filter);

    return BaseMapper.paginationFromApi(
      response.data as Components.Responses.AssignmentSubmissionMaterials,
      AssignmentSubmissionMaterialMapper.toAssignmentSubmissionMaterial
    );
  }

  static async fetchAssignmentSubmissionMaterialById(
    id: UUID
  ): Promise<AssignmentSubmissionMaterial> {
    const client = await getClient();
    const response = await client.getAssignmentSubmissionMaterial(id);

    return AssignmentSubmissionMaterialMapper.toAssignmentSubmissionMaterial(
      response.data as Components.Schemas.AssignmentSubmissionMaterial
    );
  }

  static async createAssignmentSubmissionMaterial(
    creation: AssignmentSubmissionMaterialCreation
  ): Promise<WithPutLink<AssignmentSubmissionMaterial>> {
    const client = await getClient();
    const response = (await client.createAssignmentSubmissionMaterial(
      creation.submissionId,
      creation
    )) as AxiosResponse<Components.Responses.AssignmentSubmissionMaterialCreationResponse>;

    return {
      entity: AssignmentSubmissionMaterialMapper.toAssignmentSubmissionMaterial(
        response.data.material
      ),
      putLink: response.data.putLink,
    };
  }

  static async deleteAssignmentSubmissionMaterial(id: UUID): Promise<void> {
    const client = await getClient();
    await client.deleteAssignmentSubmissionMaterial(id);
  }
}
