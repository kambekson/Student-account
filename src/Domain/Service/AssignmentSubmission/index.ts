import { UUID } from "@/Common/Entity/Base/Common";
import AssignmentSubmissionAPI from "@/Transport/api/AssignmentSubmission";
import AssignmentSubmissionMaterialAPI from "@/Transport/api/AssignmentSubmissionMaterial";
import CommonAPI from "@/Transport/api/Common";

class AssignmentSubmissionService {
  async reviseAssignmentSubmission(
    id: UUID,
    description: string,
    files?: File[]
  ): Promise<void> {
    const [materials, updatedSubmission] = await Promise.all([
      AssignmentSubmissionMaterialAPI.fetchAssignmentSubmissionMaterials({
        page: 1,
        pageSize: 100,
        assignmentSubmissionId: id,
      }),
      AssignmentSubmissionAPI.updateAssignmentSubmission(id, {
        description,
        isRevision: true,
      }),
    ]);

    const materialsToDelete = materials.items.map((material) =>
      AssignmentSubmissionMaterialAPI.deleteAssignmentSubmissionMaterial(
        material.id
      )
    );
    await Promise.all(materialsToDelete);

    if (!files) return;

    const materialsToCreate = files.map(async (file) => {
      const material =
        await AssignmentSubmissionMaterialAPI.createAssignmentSubmissionMaterial(
          {
            submissionId: id,
            schoolId: updatedSubmission.schoolId,
            name: file.name,
          }
        );

      await CommonAPI.uploadFileOnServer(file, material.putLink);

      return material;
    });

    await Promise.all(materialsToCreate);
  }
}

const assignmentSubmissionService = new AssignmentSubmissionService();
export default assignmentSubmissionService;
