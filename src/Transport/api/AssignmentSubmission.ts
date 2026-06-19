import { getClient } from "..";
import { Pagination } from "../../Common/Entity/Pagination";
import {
  AssignmentSubmission,
  AssignmentSubmissionCreation,
  AssignmentSubmissionEvaluation,
  AssignmentSubmissionFilter,
  AssignmentSubmissionUpdate,
} from "../../Common/Entity/Base/AssignmentSubmission";
import { UUID } from "@/Common/Entity/Base/Common";
import { AssignmentSubmissionMapper } from "../mappers/assignmentSubmissions";
import { Components } from "types/openapi";
import BaseMapper from "../mappers";

export default class AssignmentSubmissionAPI {
  static async fetchAssignmentSubmissions(
    filter: AssignmentSubmissionFilter
  ): Promise<Pagination<AssignmentSubmission>> {
    const client = await getClient();
    const response = await client.getAssignmentSubmissions(filter);

    return BaseMapper.paginationFromApi(
      response.data as Components.Responses.AssignmentSubmissions,
      AssignmentSubmissionMapper.toAssignmentSubmission
    );
  }

  static async fetchAssignmentSubmissionById(
    id: UUID
  ): Promise<AssignmentSubmission> {
    const client = await getClient();
    const response = await client.getAssignmentSubmission(id);

    return AssignmentSubmissionMapper.toAssignmentSubmission(
      response.data as Components.Schemas.AssignmentSubmission
    );
  }

  static async createAssignmentSubmission(
    creation: AssignmentSubmissionCreation
  ): Promise<AssignmentSubmission> {
    const client = await getClient();
    const response = await client.createAssignmentSubmission(
      null,
      AssignmentSubmissionMapper.toAssignmentSubmissionCreation(creation)
    );

    return AssignmentSubmissionMapper.toAssignmentSubmission(
      response.data as Components.Schemas.AssignmentSubmission
    );
  }

  static async updateAssignmentSubmission(
    id: UUID,
    update: AssignmentSubmissionUpdate
  ): Promise<AssignmentSubmission> {
    const client = await getClient();
    const response = await client.updateAssignmentSubmission(
      id,
      AssignmentSubmissionMapper.toAssignmentSubmissionUpdate(update)
    );

    return AssignmentSubmissionMapper.toAssignmentSubmission(
      response.data as Components.Schemas.AssignmentSubmission
    );
  }

  static async deleteAssignmentSubmission(id: UUID): Promise<void> {
    const client = await getClient();
    await client.deleteAssignmentSubmission(id);
  }

  static async evaluateAssignmentSubmission(
    assignmentSubmissionId: UUID,
    evaluation: AssignmentSubmissionEvaluation
  ): Promise<void> {
    const client = await getClient();
    await client.evaluateStudentAssignment(
      assignmentSubmissionId,
      AssignmentSubmissionMapper.toAssignmentSubmissionEvaluation(evaluation)
    );
  }
}
