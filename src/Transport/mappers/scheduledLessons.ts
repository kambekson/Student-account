import { Components } from "types/openapi";
import BaseMapper from ".";
import { Lesson, LessonSnapshot, ScheduledLesson, StudentSchedule } from "@/Common/Entity/Base/ScheduledLesson";
import { GroupCourseMapper } from "./groupCourses";

export class ScheduledLessonMapper {
  static toLesson(apiResponse: Components.Schemas.Lesson): Lesson {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      description: apiResponse.description,
      order: apiResponse.order,
      schoolId: apiResponse.schoolId,
      courseId: apiResponse.courseId,
    };
  }

  static toLessonSnapshot(apiResponse: Components.Schemas.LessonSnapshot): LessonSnapshot {
    return {
      name: apiResponse.name,
      description: apiResponse.description,
    };
  }

  static toScheduledLesson(
    apiResponse: Components.Schemas.ScheduledLesson
  ): ScheduledLesson {
    return {
      id: apiResponse.id,
      groupCourseId: apiResponse.groupCourseId,
      startAt: BaseMapper.toDate(apiResponse.startAt) as Date,
      isActive: apiResponse.isActive,
      lesson: ScheduledLessonMapper.toLesson(apiResponse.lesson),
      lessonSnapshot: ScheduledLessonMapper.toLessonSnapshot(apiResponse.lessonSnapshot),
      schoolId: apiResponse.schoolId,
      teacherId: apiResponse.teacherId,
    };
  }

  static toStudentSchedule(apiResponse: Components.Schemas.StudentSchedule): StudentSchedule {
    return {
      course: GroupCourseMapper.toCourse(apiResponse.course),
      scheduledLesson: ScheduledLessonMapper.toScheduledLesson(apiResponse.scheduledLesson),
    };
  }
  
}
