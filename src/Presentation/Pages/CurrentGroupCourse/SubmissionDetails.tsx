import { useMemo } from "react";
import Showdown from "showdown";
import DOMPurify from "dompurify";

import {
  AssignmentSubmission,
  AssignmentSubmissionStatus,
} from "@/Common/Entity/Base/AssignmentSubmission";
import { AssignmentSubmissionMaterial } from "@/Common/Entity/Base/AssignmentSubmissionMaterial";
import { ServiceFile } from "@/Common/Entity/Base/Common";
import { ScheduledAssignment } from "@/Common/Entity/Base/ScheduledAssignment";
import { Pagination } from "@/Common/Entity/Pagination";
import { MaterialItem } from "./MaterialItem";
import "@/Presentation/Styles/components/submissionDetails.scss";
import { useTranslation } from "react-i18next";

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer = ({ markdown }: MarkdownRendererProps) => {
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

  const sanitizedHtml = useMemo(() => {
    const html = converter.makeHtml(markdown);
    return DOMPurify.sanitize(html);
  }, [converter, markdown]);

  return (
    <div
      className="markdown-renderer"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

const getPointsValueClassName = (points: number, maxPoints: number): string => {
  if (points === maxPoints) {
    return "points-display__value points-display__value--good";
  }
  if (points > 0) {
    return "points-display__value points-display__value--accent";
  }
  return "points-display__value points-display__value--alert";
};

interface TeacherFeedbackProps {
  submission: AssignmentSubmission;
  maxPoints: number;
}

const TeacherFeedback = ({ submission, maxPoints }: TeacherFeedbackProps) => {
  const { t } = useTranslation();

  if (submission.status === AssignmentSubmissionStatus.EVALUATED) {
    return (
      <div className="teacher-feedback">
        <div className="feedback-card">
          <h3>{t("Оценка преподавателя")}</h3>
          <div className="points-display">
            <span className="points-display__label">{t("Баллы")}:</span>
            <span
              className={getPointsValueClassName(submission.points, maxPoints)}
            >
              {submission.points}/{maxPoints}
            </span>
          </div>

          <div className="feedback-text">
            <span className="feedback-label">{t("Комментарий")}:</span>
            <p>{submission.feedback}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-feedback">
      <div className="feedback-card">
        <h3>{t("Комментарий преподавателя")}</h3>
        <p>{submission.feedback}</p>
      </div>
    </div>
  );
};

interface UserSubmissionProps {
  description?: string;
  materials?: Pagination<AssignmentSubmissionMaterial> | null;
  onOpenMaterial: (material: ServiceFile) => void;
}

const UserSubmission = ({
  description,
  materials,
  onOpenMaterial,
}: UserSubmissionProps) => {
  const { t } = useTranslation();
  return (
    <div className="submission-container">
      <h3>{t("Ваш ответ")}</h3>
      {description && <MarkdownRenderer markdown={description} />}

      {materials?.items && materials.items.length > 0 && (
        <div className="submission-attachments">
          <h3>{t("Прикрепленные файлы")}:</h3>
          <div className="study-materials-list">
            {materials.items.map(
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
        </div>
      )}
    </div>
  );
};

interface SubmissionDetailsProps {
  submission: AssignmentSubmission;
  assignment: ScheduledAssignment;
  materials: Pagination<AssignmentSubmissionMaterial> | null;
  onOpenMaterial: (material: ServiceFile) => void;
}

export const SubmissionDetails = ({
  submission,
  assignment,
  materials,
  onOpenMaterial,
}: SubmissionDetailsProps) => {
  const hasUserSubmission =
    !!submission.description ||
    (!!materials?.items && materials.items.length > 0);

  const hasTeacherFeedback = !!submission.feedback || submission.points !== 0;

  return (
    <div className="submission-feedback-container">
      {hasTeacherFeedback &&
        submission.status !== AssignmentSubmissionStatus.ATTACHED && (
          <TeacherFeedback
            submission={submission}
            maxPoints={assignment.assignmentSnapshot.maxPoints}
          />
        )}

      {hasUserSubmission && (
        <UserSubmission
          description={submission.description}
          materials={materials}
          onOpenMaterial={onOpenMaterial}
        />
      )}
    </div>
  );
};
