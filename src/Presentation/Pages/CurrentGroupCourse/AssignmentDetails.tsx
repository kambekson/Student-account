import {
  AssignmentSubmission,
  AssignmentSubmissionStatus,
} from "@/Common/Entity/Base/AssignmentSubmission";
import { AssignmentSubmissionMaterial } from "@/Common/Entity/Base/AssignmentSubmissionMaterial";
import { GroupCourse } from "@/Common/Entity/Base/GroupCourse";
import {
  AssignmentSnapshot,
  ScheduledAssignment,
} from "@/Common/Entity/Base/ScheduledAssignment";
import { StudyMaterial } from "@/Common/Entity/Base/StudyMaterial";
import { Pagination } from "@/Common/Entity/Pagination";
import { FC, useCallback, useMemo, useState } from "react";
import { TUploadFile } from "./FileUplaodZone";
import { ServiceFile } from "@/Common/Entity/Base/Common";
import Showdown from "showdown";
import DOMPurify from "dompurify";
import { MaterialItem } from "./MaterialItem";
import { SubmissionDetails } from "./SubmissionDetails";
import ReactMde from "react-mde";
import { AiOutlinePaperClip } from "react-icons/ai";
import Card from "@/Presentation/Components/Card";
import { useTranslation } from "react-i18next";

export const AssignmentDetails: FC<{
  currentAssignmentSnapshot: AssignmentSnapshot;
  currentScheduledAssignment: ScheduledAssignment | undefined;
  studyMaterials: Pagination<StudyMaterial>;
  assignmentSubmissions: Pagination<AssignmentSubmission> | null;
  assignmentSubmissionMaterials: Pagination<AssignmentSubmissionMaterial> | null;
  currentGroupCourse: GroupCourse | null;
  description: string;
  setDescription: (description: string) => void;
  files: TUploadFile[];
  setFiles: (files: TUploadFile[]) => void;
  onOpenMaterial: (file: ServiceFile) => void;
  isAssignmentSubmissionLoading: boolean;
  onAddAssignmentSubmission: () => void;
  onOpenFileAttachmentModal: () => void;
}> = ({
  currentAssignmentSnapshot,
  currentScheduledAssignment,
  studyMaterials,
  assignmentSubmissions,
  assignmentSubmissionMaterials,
  description,
  setDescription,
  files,
  setFiles,
  onOpenMaterial,
  isAssignmentSubmissionLoading,
  onAddAssignmentSubmission,
  onOpenFileAttachmentModal,
}) => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const { t } = useTranslation();

  const converter = useMemo(
    () =>
      new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
      }),
    []
  );

  const generateMarkdownPreview = useCallback(
    (markdownText: string) =>
      Promise.resolve(DOMPurify.sanitize(converter.makeHtml(markdownText))),
    [converter]
  );

  const submissionStatus =
    currentScheduledAssignment?.studentAssignmentSubmission?.status;

  const isOnRevision =
    submissionStatus === AssignmentSubmissionStatus.ON_REVISION;
  const isAttached = submissionStatus === AssignmentSubmissionStatus.ATTACHED;
  const isEvaluated = submissionStatus === AssignmentSubmissionStatus.EVALUATED;

  return (
    <div className="assignment-info">
      <h2 className="regular">{currentAssignmentSnapshot.name}</h2>

      <div className="assignment-info-status">
        <h2 className="regular">
          {isOnRevision && (
            <span style={{ color: "var(--color-alert)" }}>
              {t("На доработке")}
            </span>
          )}
          {isAttached && (
            <span style={{ color: "var(--color-accent)" }}>
              {t("На проверке")}
            </span>
          )}
          {isEvaluated && (
            <span style={{ color: "var(--color-good)" }}>{t("Проверено")}</span>
          )}
        </h2>
      </div>

      {(currentAssignmentSnapshot.description ||
        studyMaterials.items?.length > 0) && (
        <div className="assignment-info-description">
          {currentAssignmentSnapshot.description && (
            <>
              <h3>{t("Описание задания")}:</h3>
              <p>{currentAssignmentSnapshot.description}</p>
            </>
          )}

          {studyMaterials.items?.length > 0 && (
            <>
              <h3>{t("Прикрепленные материалы")}:</h3>
              <div className="study-materials-list">
                {studyMaterials.items.map(
                  (material) =>
                    material.materialFile && (
                      <MaterialItem
                        key={material.id}
                        material={material.materialFile}
                        onOpen={onOpenMaterial}
                      />
                    )
                )}
              </div>
            </>
          )}
        </div>
      )}

      {assignmentSubmissions?.items &&
        assignmentSubmissions.items.length > 0 && (
          <SubmissionDetails
            submission={assignmentSubmissions.items[0]}
            assignment={currentScheduledAssignment!}
            materials={assignmentSubmissionMaterials}
            onOpenMaterial={onOpenMaterial}
          />
        )}

      {!isAttached && !isEvaluated && (
        <>
          <div className="input-wrapper answer" style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <ReactMde
                value={description}
                onChange={setDescription}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={generateMarkdownPreview}
                childProps={{
                  writeButton: {
                    tabIndex: -1,
                  },
                  previewButton: {
                    tabIndex: -1,
                  },
                }}
                l18n={{
                  write: t("редактирование"),
                  preview: t("предпросмотр"),
                  uploadingImage: `${t("загрузка изображения")}...`,
                  pasteDropSelect: t("выберите текст для вставки"),
                }}
              />
            </div>
            <button
              className="attach-button"
              onClick={onOpenFileAttachmentModal}
            >
              <AiOutlinePaperClip size={20} />
            </button>
          </div>

          {files.length > 0 && (
            <>
              <h3>{t("Прикрепленные файлы")}:</h3>
              <div className="study-materials-list">
                {files.map((f, idx) => (
                  <Card
                    key={idx}
                    className="accent-2-border"
                    style={{ marginTop: "5px" }}
                  >
                    <h3 className="material-name">{f.file.name}</h3>
                    <button
                      className="external-link-button"
                      onClick={() => {
                        const newFiles = [...files];
                        newFiles.splice(idx, 1);
                        setFiles(newFiles);
                      }}
                      style={{ marginTop: "10px" }}
                    >
                      <span>{t("Удалить")}</span>
                    </button>
                  </Card>
                ))}
              </div>
            </>
          )}

          <div className="send-button-container">
            <button
              disabled={isAssignmentSubmissionLoading}
              className="accent-button"
              onClick={onAddAssignmentSubmission}
            >
              <span>{t("Отправить на проверку")}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
