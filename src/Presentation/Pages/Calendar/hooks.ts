import { useQuery } from "@tanstack/react-query";
import { endOfMonth, startOfMonth } from "date-fns";

import { UUID } from "@/Common/Entity/Base/Common";
import {
  StudentSchedule,
  StudentScheduleFilter,
} from "@/Common/Entity/Base/ScheduledLesson";
import { Pagination } from "@/Common/Entity/Pagination";

import ScheduledLessonAPI from "@/Transport/api/ScheduledLesson";

export const useStudentSchedule = (userId?: UUID, date: Date = new Date()) => {
  return useQuery({
    queryKey: ["studentSchedule", userId, date.getFullYear(), date.getMonth()],
    queryFn: async () => {
      if (!userId) return [];

      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      const filter: StudentScheduleFilter = {
        page: 1,
        pageSize: 100,
        studentId: userId,
        startDate,
        endDate,
      };

      const firstPage = await ScheduledLessonAPI.fetchStudentSchedule(filter);

      if (firstPage.metadata.totalPages <= 1) {
        return firstPage.items;
      }

      const requests: Promise<Pagination<StudentSchedule>>[] = [];
      for (let page = 2; page <= firstPage.metadata.totalPages; page++) {
        requests.push(
          ScheduledLessonAPI.fetchStudentSchedule({ ...filter, page })
        );
      }

      const responses = await Promise.all(requests);
      return [
        ...firstPage.items,
        ...responses.flatMap((response) => response.items),
      ];
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
