import { getClient } from "@/shared/api/base";
import { Pagination } from "@/entities/Common";
import {
  AssignmentSubmission,
  AssignmentSubmissionCreation,
  AssignmentSubmissionEvaluation,
  AssignmentSubmissionFilter,
  AssignmentSubmissionUpdate,
} from "@/entities/AssignmentSubmission";
import { UUID } from "@/entities/Common";
import { AssignmentSubmissionMapper } from "./mapper";
import { Components } from "types/openapi";
import BaseMapper from "@/entities/Common/api/mapper";

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
