import { UUID } from "@/entities/Common";
import { AssignmentSubmissionAPI } from "@/entities/AssignmentSubmission";
import { AssignmentSubmissionMaterialAPI } from "@/entities/AssignmentSubmissionMaterial";
import { CommonAPI } from "@/entities/Common";

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
