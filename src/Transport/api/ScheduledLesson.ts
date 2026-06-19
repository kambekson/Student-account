import {
  ScheduledLesson,
  ScheduledLessonFilter,
  StudentSchedule,
  StudentScheduleFilter,
} from "@/Common/Entity/Base/ScheduledLesson";
import { Pagination } from "@/Common/Entity/Pagination";
import { getClient } from "..";
import BaseMapper from "../mappers";
import { Components, Paths } from "types/openapi";
import { ScheduledLessonMapper } from "../mappers/scheduledLessons";
import { UUID } from "@/Common/Entity/Base/Common";

export default class ScheduledLessonAPI {
  static async fetchScheduledLessons(
    filter: ScheduledLessonFilter
  ): Promise<Pagination<ScheduledLesson>> {
    const client = await getClient();
    const response = await client.getScheduledLessons(filter);

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetScheduledLessons.Responses.$200,
      ScheduledLessonMapper.toScheduledLesson
    );
  }

  static async fetchScheduledLessonById(id: UUID): Promise<ScheduledLesson> {
    const client = await getClient();
    const response = await client.getScheduledLesson(id);

    return ScheduledLessonMapper.toScheduledLesson(
      response.data as Components.Schemas.ScheduledLesson
    );
  }

  static async fetchStudentSchedule(
    filter: StudentScheduleFilter
  ): Promise<Pagination<StudentSchedule>> {
    const client = await getClient();
    const response = await client.getStudentSchedule({
      studentId: filter.studentId,
      groupId: filter.groupId,
      isActive: filter.isActive,
      startDate: filter.startDate?.toISOString(),
      endDate: filter.endDate?.toISOString(),
      page: filter.page,
      pageSize: filter.pageSize
    });

    return BaseMapper.paginationFromApi(
      response.data as Paths.GetStudentSchedule.Responses.$200,
      ScheduledLessonMapper.toStudentSchedule
    );
  }
}
