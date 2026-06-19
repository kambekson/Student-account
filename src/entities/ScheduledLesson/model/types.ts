import { BaseFilter, SortDirection, UUID } from "@/entities/Common";
import { Course } from "@/entities/GroupCourse";

export interface ScheduledLesson {
  id: UUID;
  groupCourseId: UUID;
  startAt: Date;
  isActive: boolean;
  lesson: Lesson;
  lessonSnapshot: LessonSnapshot;
  schoolId: UUID;
  teacherId: UUID;
}

export interface Lesson {
  id: UUID;
  name: string;
  description?: string;
  order: number;
  schoolId: UUID;
  courseId?: UUID;
}

export interface LessonSnapshot {
  name: string;
  description: string | null;
}

export interface ScheduledLessonFilter extends BaseFilter {
  schoolId: UUID;
  teacherId?: UUID;
  lessonId?: UUID;
  groupCourseId?: UUID;
  isActive?: boolean;
  sort?: SortDirection;
}

export interface StudentSchedule {
  course: Course;
  scheduledLesson: ScheduledLesson;
}

export interface StudentScheduleFilter extends BaseFilter {
  studentId?: UUID;
  groupId?: UUID;
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
}
