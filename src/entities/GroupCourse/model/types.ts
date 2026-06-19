import { BaseFilter, UUID } from "@/entities/Common";
import { PointType } from "@/entities/PointWallet";
import { User } from "@/entities/User";

export interface Course {
  id: UUID;
  name: string;
  description?: string;
  schoolId: UUID;
}

export interface Group {
  id: UUID;
  name: string;
  description?: string;
  schoolId: UUID;
  branchId: UUID;
  pointType?: PointType;
}

export interface GroupFilter extends BaseFilter {
  schoolId: UUID;
  studentId?: UUID;
  teacherId?: UUID;
}

export interface GroupCourse {
  id: UUID;
  course: Course;
  groupId: UUID;
  schoolId: UUID;
  teacher: User;
  completedAt?: Date;
}

export interface GroupCourseFilter extends BaseFilter {
  schoolId: UUID,
  courseId?: UUID,
  teacherId?: UUID,
  groupId?: UUID,
  studentId?: UUID,
  isCompleted?: boolean
}
