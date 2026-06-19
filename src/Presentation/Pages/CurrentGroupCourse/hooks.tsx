import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { ScheduledAssignment } from "@/Common/Entity/Base/ScheduledAssignment";
import { User } from "@/Common/Entity/Base/User";
import { fetchAllScheduledAssignmentsAsync } from "@/Domain/Slice/ScheduledAssignment";
import { AppDispatch } from "@/store";
import { Pagination } from "@/Common/Entity/Pagination";
import {
  clearScheduledLessonPagination,
  fetchAllScheduledLessonsAsync,
} from "@/Domain/Slice/ScheduledLesson";
import {
  clearCurrentGroupCourse,
  fetchGroupCourseAsync,
} from "@/Domain/Slice/GroupCourse";
import { clearCurrentGroup, fetchGroupAsync } from "@/Domain/Slice/Group";
import { clearAssignmentSubmissionPagination } from "@/Domain/Slice/AssignmentSubmission";
import { clearAssignmentSubmissionMaterialPagination } from "@/Domain/Slice/AssignmentSubmissionMaterial";
import { clearStudyMaterialPagination } from "@/Domain/Slice/StudyMaterial";
import { SortDirection } from "@/Common/Entity/Base/Common";

export const useScheduledAssignments = (user: User | undefined) => {
  const [scheduledAssignmentsMap, setScheduledAssignmentsMap] = useState<
    Record<string, ScheduledAssignment[]>
  >({});
  const dispatch = useDispatch<AppDispatch>();

  const fetchScheduledAssignments = useCallback(
    async (scheduledLessonId: string) => {
      if (!user?.schoolId) return [];

      const response = await dispatch(
        fetchAllScheduledAssignmentsAsync({
          page: 1,
          pageSize: 100,
          schoolId: user.schoolId,
          scheduledLessonId,
        })
      );

      const newAssignments =
        response.payload &&
        typeof response.payload === "object" &&
        "items" in response.payload
          ? (response.payload as Pagination<ScheduledAssignment>).items
          : [];

      setScheduledAssignmentsMap((prev) => ({
        ...prev,
        [scheduledLessonId]: newAssignments,
      }));

      return newAssignments;
    },
    [dispatch, user?.schoolId]
  );

  return {
    scheduledAssignmentsMap,
    fetchScheduledAssignments,
  };
};

export const useScheduledLessons = (
  groupCourseId: string | undefined,
  schoolId: string | undefined,
  sortDirection: SortDirection | undefined
) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchLessons = useCallback(async () => {
    if (!groupCourseId || !schoolId) return null;

    return await dispatch(
      fetchAllScheduledLessonsAsync({
        page: 1,
        pageSize: 100,
        schoolId,
        groupCourseId,
        isActive: true,
        sort: sortDirection,
      })
    );
  }, [dispatch, groupCourseId, schoolId]);

  return { fetchLessons };
};

export const useCourseGroupData = (groupCourseId: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchCourseGroupData = useCallback(async () => {
    if (!groupCourseId) return;

    const responseGroupCourse = await dispatch(
      fetchGroupCourseAsync(groupCourseId)
    );
    if (fetchGroupCourseAsync.fulfilled.match(responseGroupCourse)) {
      await dispatch(fetchGroupAsync(responseGroupCourse.payload.groupId));
    }
  }, [dispatch, groupCourseId]);

  return { fetchCourseGroupData };
};

export const useCleanupActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(() => {
    dispatch(clearCurrentGroupCourse());
    dispatch(clearCurrentGroup());
    dispatch(clearScheduledLessonPagination());
    dispatch(clearStudyMaterialPagination());
    dispatch(clearAssignmentSubmissionPagination());
    dispatch(clearAssignmentSubmissionMaterialPagination());
  }, [dispatch]);
};
