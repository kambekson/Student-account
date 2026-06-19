import { useEffect, useState, useCallback, FC, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store";
import {
  clearStudyMaterialPagination,
  fetchAllStudyMaterialsAsync,
} from "@/entities/StudyMaterial";
import {
  addAssignmentSubmissionAsync,
  clearAssignmentSubmissionPagination,
  fetchAllAssignmentSubmissionsAsync,
} from "@/entities/AssignmentSubmission";
import {
  clearAssignmentSubmissionMaterialPagination,
  fetchAllAssignmentSubmissionMaterialsAsync,
} from "@/entities/AssignmentSubmissionMaterial";
import {
  Assignment,
  AssignmentSnapshot,
  ScheduledAssignment,
} from "@/entities/ScheduledAssignment";
import {
  AssignmentSubmission,
  AssignmentSubmissionStatus,
} from "@/entities/AssignmentSubmission";
import { Pagination } from "@/entities/Common";
import Card from "@/shared/ui/Card";
import Modal from "@/shared/ui/Modal";
import {
  notifyError,
  notifySuccess,
  notifyLoading,
  deleteToast,
} from "@/shared/ui/Toasts/options";
import { openInNewTab } from "@/shared/ui/utils";

import "@/pages/CurrentGroup/style.css";
import "@/app/styles/page.css";
import "./style.css";
import { ServiceFile, SortDirection } from "@/entities/Common";
import { FileUploadZone, TUploadFile } from "./FileUplaodZone";
import { LessonItem } from "./LessonItem";
import { AssignmentDetails } from "./AssignmentDetails";
import { assignmentSubmissionService } from "@/entities/AssignmentSubmission";
import { ScheduledLesson } from "@/entities/ScheduledLesson";
import {
  useCleanupActions,
  useCourseGroupData,
  useScheduledAssignments,
  useScheduledLessons,
} from "./hooks";
import { useIsPortrait } from "@/shared/lib/hooks/isPortrait";
import { useTranslation } from "react-i18next";

const CurrentGroupCoursePage: FC = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const isPortrait = useIsPortrait();

  const user = useSelector((state: RootState) => state.auth.user);
  const scheduledLessons = useSelector(
    (state: RootState) => state.scheduledLesson.scheduledLessonsPagination
  );
  const studyMaterials = useSelector(
    (state: RootState) => state.studyMaterial.studyMaterialsPagination
  );
  const studyMaterialsStatus = useSelector(
    (state: RootState) => state.studyMaterial.status
  );
  const currentGroupCourse = useSelector(
    (state: RootState) => state.groupCourse.currentGroupCourse
  );
  const currentGroup = useSelector(
    (state: RootState) => state.group.currentGroup
  );
  const assignmentSubmissionMaterials = useSelector(
    (state: RootState) =>
      state.assignmentSubmissionMaterial.assignmentSubmissionMaterialsPagination
  );
  const assignmentSubmissions = useSelector(
    (state: RootState) =>
      state.assignmentSubmission.assignmentSubmissionPagination
  );

  const assignmentsListRef = useRef<HTMLDivElement | null>(null);

  const [files, setFiles] = useState<TUploadFile[]>([]);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [description, setDescription] = useState("");
  const [isAssignmentSubmissionLoading, setIsAssignmentSubmissionLoading] =
    useState(false);
  const [isFileAttachmentModalOpen, setIsFileAttachmentModalOpen] =
    useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<
    Assignment | undefined
  >();
  const [currentAssignmentSnapshot, setCurrentAssignmentSnapshot] = useState<
    AssignmentSnapshot | undefined
  >();
  const [currentScheduledAssignment, setCurrentScheduledAssignment] = useState<
    ScheduledAssignment | undefined
  >();

  const { scheduledAssignmentsMap, fetchScheduledAssignments } =
    useScheduledAssignments(user || undefined);

  const { fetchLessons } = useScheduledLessons(
    id,
    user?.schoolId,
    SortDirection.DESC
  );
  const { fetchCourseGroupData } = useCourseGroupData(id);
  const cleanup = useCleanupActions();

  const lessonIdFromState = location.state?.lessonId;

  const handleTargetLesson = useCallback(
    async (payload: Pagination<ScheduledLesson>) => {
      if (!lessonIdFromState) return;

      const targetLesson = payload.items.find(
        (lesson) => lesson.id === lessonIdFromState
      );

      if (targetLesson) {
        setOpenItems((prev) => ({
          ...prev,
          [lessonIdFromState]: true,
        }));

        await fetchScheduledAssignments(lessonIdFromState);
      }
    },
    [lessonIdFromState, fetchScheduledAssignments]
  );

  useEffect(() => {
    if (!id || !user?.schoolId) return;

    const loadData = async () => {
      const lessonsResponse = await fetchLessons();
      if (
        lessonsResponse &&
        lessonsResponse.payload &&
        typeof lessonsResponse.payload === "object" &&
        "items" in lessonsResponse.payload
      ) {
        await handleTargetLesson(
          lessonsResponse.payload as Pagination<ScheduledLesson>
        );
      }
      await fetchCourseGroupData();
    };

    loadData();

    return cleanup;
  }, [
    id,
    user?.schoolId,
    fetchLessons,
    handleTargetLesson,
    fetchCourseGroupData,
    cleanup,
  ]);

  const onToggleLesson = useCallback(
    async (lessonKey: string, scheduledLessonId: string) => {
      setOpenItems((prev) => ({
        ...prev,
        [lessonKey]: !prev[lessonKey],
      }));

      if (!scheduledAssignmentsMap[scheduledLessonId]) {
        await fetchScheduledAssignments(scheduledLessonId);
      }
    },
    [fetchScheduledAssignments, scheduledAssignmentsMap]
  );

  const resetAssignmentForm = useCallback(() => {
    setDescription("");
    setFiles([]);
  }, []);

  const onSelectAssignment = useCallback(
    async (scheduledAssignment: ScheduledAssignment) => {
      if (assignmentsListRef.current && isPortrait) {
        const element = assignmentsListRef.current;
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const offset = 600;

        const targetScroll =
          rect.bottom + scrollTop - window.innerHeight + offset;

        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }

      if (currentAssignment?.id !== scheduledAssignment.assignment.id) {
        resetAssignmentForm();
        dispatch(clearStudyMaterialPagination());
        dispatch(clearAssignmentSubmissionMaterialPagination());
        dispatch(clearAssignmentSubmissionPagination());

        setCurrentAssignment(scheduledAssignment.assignment);
        setCurrentAssignmentSnapshot(scheduledAssignment.assignmentSnapshot);
        setCurrentScheduledAssignment(scheduledAssignment);

        if (user?.schoolId && scheduledAssignment.assignment.id) {
          dispatch(
            fetchAllStudyMaterialsAsync({
              page: 1,
              pageSize: 100,
              schoolId: user.schoolId,
              assignmentId: scheduledAssignment.assignment.id,
            })
          );
        }

        if (scheduledAssignment.id && user?.id) {
          const response = await dispatch(
            fetchAllAssignmentSubmissionsAsync({
              page: 1,
              pageSize: 100,
              scheduledAssignmentId: scheduledAssignment.id,
              studentId: user.id,
            })
          );
          const submissions =
            response.payload &&
            (response.payload as Pagination<AssignmentSubmission>).items;

          if (Array.isArray(submissions) && submissions.length > 0) {
            const latestSubmission = submissions[submissions.length - 1];
            dispatch(
              fetchAllAssignmentSubmissionMaterialsAsync({
                page: 1,
                pageSize: 100,
                assignmentSubmissionId: latestSubmission.id,
              })
            );
          }
        }
      }
    },
    [
      currentAssignment?.id,
      dispatch,
      resetAssignmentForm,
      user?.id,
      user?.schoolId,
    ]
  );

  const onOpenMaterial = useCallback((file: ServiceFile) => {
    openInNewTab(file.url);
  }, []);

  const onAddAssignmentSubmission = useCallback(async () => {
    if (
      !currentScheduledAssignment ||
      !user?.schoolId ||
      (!description && !files.length)
    )
      return;

    setIsAssignmentSubmissionLoading(true);
    const loadingToastId = notifyLoading(
      `${t("Идет загрузка файла(ов)")}...`,
      ""
    );

    try {
      if (
        currentScheduledAssignment.studentAssignmentSubmission?.status ===
        AssignmentSubmissionStatus.ON_REVISION
      ) {
        await assignmentSubmissionService.reviseAssignmentSubmission(
          currentScheduledAssignment.studentAssignmentSubmission.id,
          description,
          files.map((f) => f.file)
        );

        resetAssignmentForm();
        dispatch(clearStudyMaterialPagination());
        setCurrentAssignment(undefined);
        setCurrentAssignmentSnapshot(undefined);
        setCurrentScheduledAssignment(undefined);

        notifySuccess(`${t("Решение успешно отправлено на доработку")}.`, "");
        return;
      }

      const response = await dispatch(
        addAssignmentSubmissionAsync({
          model: {
            scheduledAssignmentId: currentScheduledAssignment.id,
            description,
            schoolId: user.schoolId,
          },
          files: files.map((f) => f.file),
        })
      );

      if (addAssignmentSubmissionAsync.fulfilled.match(response)) {
        if (currentScheduledAssignment.scheduledLessonId) {
          await fetchScheduledAssignments(
            currentScheduledAssignment.scheduledLessonId
          );
        }
        resetAssignmentForm();
        dispatch(clearStudyMaterialPagination());
        setCurrentAssignment(undefined);
        setCurrentAssignmentSnapshot(undefined);
        setCurrentScheduledAssignment(undefined);

        notifySuccess(`${t("Решение успешно загружено")}.`, "");
      } else {
        const errorMessage = response.error?.message || t("Неизвестная ошибка");
        notifyError(
          `${t("Не удалось загрузить решение")}.`,
          `${t("Ошибка")}: ${errorMessage}`
        );
      }
    } catch (error: any) {
      notifyError(
        `${t("Не удалось загрузить решение")}.`,
        `${t("Ошибка")}:  ${error.message || "Неизвестная ошибка"}`
      );
    } finally {
      deleteToast(loadingToastId);
      setIsAssignmentSubmissionLoading(false);
    }
  }, [
    currentScheduledAssignment,
    description,
    dispatch,
    files,
    fetchScheduledAssignments,
    resetAssignmentForm,
    user?.schoolId,
  ]);

  const onOpenFileAttachmentModal = useCallback(() => {
    setIsFileAttachmentModalOpen(true);
  }, []);
  const onCloseFileAttachmentModal = useCallback(() => {
    setIsFileAttachmentModalOpen(false);
  }, []);
  const resetFileAttachment = useCallback(() => {
    setFiles([]);
    onCloseFileAttachmentModal();
  }, [onCloseFileAttachmentModal]);

  const isLoadingCourse = !currentGroupCourse;
  const isLoadingMaterials = studyMaterialsStatus === "loading";
  const showAssignmentDetails = !!currentAssignment && !!studyMaterials;

  return (
    <>
      <div className="page">
        <div
          className="group-course-grid"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div />
          <div className="group-course-wrapper">
            {isLoadingCourse ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
              </div>
            ) : (
              <h1 className="group-course-header-wrapper">
                {currentGroupCourse.course.name}
              </h1>
            )}

            <div className="main-info-group">
              <div className="assignments-list" ref={assignmentsListRef}>
                <Card className="accent-border">
                  {scheduledLessons ? (
                    <div className="flex flex-col divide-y divide-gray-100">
                      {scheduledLessons.items.map((lesson) => (
                        <LessonItem
                          key={lesson.id}
                          lesson={lesson}
                          openItems={openItems}
                          scheduledAssignmentsMap={scheduledAssignmentsMap}
                          onToggle={onToggleLesson}
                          currentAssignment={currentAssignment}
                          onSelectAssignment={onSelectAssignment}
                          pointType={currentGroup?.pointType}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
                    </div>
                  )}
                </Card>
              </div>

              <div>
                {showAssignmentDetails ? (
                  <AssignmentDetails
                    currentAssignmentSnapshot={currentAssignmentSnapshot!}
                    currentScheduledAssignment={currentScheduledAssignment}
                    studyMaterials={studyMaterials}
                    assignmentSubmissions={assignmentSubmissions}
                    assignmentSubmissionMaterials={
                      assignmentSubmissionMaterials
                    }
                    currentGroupCourse={currentGroupCourse}
                    description={description}
                    setDescription={setDescription}
                    files={files}
                    setFiles={setFiles}
                    onOpenMaterial={onOpenMaterial}
                    isAssignmentSubmissionLoading={
                      isAssignmentSubmissionLoading
                    }
                    onAddAssignmentSubmission={onAddAssignmentSubmission}
                    onOpenFileAttachmentModal={onOpenFileAttachmentModal}
                  />
                ) : (
                  <>
                    {isLoadingMaterials && (
                      <div className="centered-loadng flex justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>

      <Modal
        isOpen={isFileAttachmentModalOpen}
        onClose={onCloseFileAttachmentModal}
        className="transparent"
      >
        <h2>{t("Прикрепить файлы")}</h2>

        <FileUploadZone files={files} setFiles={setFiles} />

        <div className="modal-actions" style={{ marginTop: "20px" }}>
          <button
            type="button"
            className="primary-button"
            onClick={resetFileAttachment}
          >
            <span>{t("Отмена")}</span>
          </button>
          <button
            className="accent-2-button"
            onClick={onCloseFileAttachmentModal}
          >
            <span>{t("Ок")}</span>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CurrentGroupCoursePage;
