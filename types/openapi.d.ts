import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type AbsenceReasonId = Schemas.UUID /* uuid */;
        export type AssignmentId = Schemas.UUID /* uuid */;
        export type AssignmentIdFilter = Schemas.UUID /* uuid */;
        export type AssignmentSubmissionId = Schemas.UUID /* uuid */;
        export type AssignmentSubmissionMaterialId = Schemas.UUID /* uuid */;
        export type AssignmentTypeFilter = Schemas.AssignmentType;
        export type BranchId = Schemas.UUID /* uuid */;
        export type BranchIdFilter = Schemas.UUID /* uuid */;
        export type ClientId = Schemas.UUID /* uuid */;
        export type CourseId = Schemas.UUID /* uuid */;
        export type CourseIdFilter = Schemas.UUID /* uuid */;
        export type DateEndFilter = Schemas.DateTime /* date-time */;
        export type DateStartFilter = Schemas.DateTime /* date-time */;
        export type DirectorIdFilter = Schemas.UUID /* uuid */;
        export type EndDateFilter = Schemas.DateTime /* date-time */;
        export type ExcelFileId = string;
        export type FieldId = Schemas.UUID /* uuid */;
        /**
         * A value or range of values to filter on the values of a specific field. Range works only for fields of type [integer, float, date], for this you need to pass the value in the form "from;to". Filtering by substrings works for [string, text]. Other types will be filtered by exact match
         */
        export interface FieldsFilter {
            [name: string]: string;
        }
        export type GroupCourseId = Schemas.UUID /* uuid */;
        export type GroupCourseIdFilter = Schemas.UUID /* uuid */;
        export type GroupId = Schemas.UUID /* uuid */;
        export type GroupIdFilter = Schemas.UUID /* uuid */;
        export type Inverse = boolean;
        export type IsActiveFilter = boolean;
        export type IsClosedFilter = boolean;
        export type IsCompletedFilter = boolean;
        export type LessonId = Schemas.UUID /* uuid */;
        export type LessonIdFilter = Schemas.UUID /* uuid */;
        export type LessonIds = Schemas.UUID /* uuid */[];
        export type LessonSubscriptionId = Schemas.UUID /* uuid */;
        export type ManagerId = Schemas.UUID /* uuid */;
        export type ManagerIdFilter = Schemas.UUID /* uuid */;
        export type NotificationId = Schemas.UUID /* uuid */;
        export type OnlyEmployeesFilter = boolean;
        export type Page = number;
        export type PageSize = number;
        export type PointTypeId = Schemas.UUID /* uuid */;
        export type RemovedFromGroupFilter = boolean;
        export type RoleFilter = Schemas.UserRole;
        export type ScheduledAssignmentId = Schemas.UUID /* uuid */;
        export type ScheduledAssignmentIdFilter = Schemas.UUID /* uuid */;
        export type ScheduledLessonId = Schemas.UUID /* uuid */;
        export type ScheduledLessonIdFilter = Schemas.UUID /* uuid */;
        export type SchoolId = Schemas.UUID /* uuid */;
        export type SchoolIdFilter = Schemas.UUID /* uuid */;
        export type SearchFilter = string;
        export type Sort = Schemas.SortDirection;
        export type StartDateFilter = Schemas.DateTime /* date-time */;
        export type StudentGroupIdFilter = Schemas.UUID /* uuid */;
        export type StudentId = Schemas.UUID /* uuid */;
        export type StudentIdFilter = Schemas.UUID /* uuid */;
        export type StudentUserIdFilter = Schemas.UUID /* uuid */;
        export type StudyMaterialId = Schemas.UUID /* uuid */;
        export type TeacherIdFilter = Schemas.UUID /* uuid */;
        export type UserId = Schemas.UUID /* uuid */;
        export type UsernameCount = number;
        export type UtcOffset = Schemas.UTCOffset;
        export type WalletId = Schemas.UUID /* uuid */;
    }
    export interface PathParameters {
        absenceReasonId: Parameters.AbsenceReasonId;
        assignmentId: Parameters.AssignmentId;
        assignmentSubmissionId: Parameters.AssignmentSubmissionId;
        assignmentSubmissionMaterialId: Parameters.AssignmentSubmissionMaterialId;
        branchId: Parameters.BranchId;
        clientId: Parameters.ClientId;
        courseId: Parameters.CourseId;
        excelFileId: Parameters.ExcelFileId;
        fieldId: Parameters.FieldId;
        groupCourseId: Parameters.GroupCourseId;
        groupId: Parameters.GroupId;
        lessonId: Parameters.LessonId;
        lessonSubscriptionId: Parameters.LessonSubscriptionId;
        managerId: Parameters.ManagerId;
        notificationId: Parameters.NotificationId;
        pointTypeId: Parameters.PointTypeId;
        scheduledAssignmentId: Parameters.ScheduledAssignmentId;
        scheduledLessonId: Parameters.ScheduledLessonId;
        schoolId: Parameters.SchoolId;
        studentId: Parameters.StudentId;
        studyMaterialId: Parameters.StudyMaterialId;
        userId: Parameters.UserId;
        walletId: Parameters.WalletId;
    }
    export interface QueryParameters {
        assignmentIdFilter?: Parameters.AssignmentIdFilter;
        assignmentTypeFilter?: Parameters.AssignmentTypeFilter;
        branchIdFilter?: Parameters.BranchIdFilter;
        courseIdFilter?: Parameters.CourseIdFilter;
        dateEndFilter?: Parameters.DateEndFilter;
        dateStartFilter?: Parameters.DateStartFilter;
        directorIdFilter?: Parameters.DirectorIdFilter;
        endDateFilter?: Parameters.EndDateFilter;
        fieldsFilter?: /* A value or range of values to filter on the values of a specific field. Range works only for fields of type [integer, float, date], for this you need to pass the value in the form "from;to". Filtering by substrings works for [string, text]. Other types will be filtered by exact match */ Parameters.FieldsFilter;
        groupCourseIdFilter?: Parameters.GroupCourseIdFilter;
        groupIdFilter?: Parameters.GroupIdFilter;
        inverse?: Parameters.Inverse;
        isActiveFilter?: Parameters.IsActiveFilter;
        isClosedFilter?: Parameters.IsClosedFilter;
        isCompletedFilter?: Parameters.IsCompletedFilter;
        lessonIdFilter?: Parameters.LessonIdFilter;
        lessonIds?: Parameters.LessonIds;
        managerIdFilter?: Parameters.ManagerIdFilter;
        onlyEmployeesFilter?: Parameters.OnlyEmployeesFilter;
        page?: Parameters.Page;
        pageSize?: Parameters.PageSize;
        removedFromGroupFilter?: Parameters.RemovedFromGroupFilter;
        roleFilter?: Parameters.RoleFilter;
        scheduledAssignmentIdFilter?: Parameters.ScheduledAssignmentIdFilter;
        scheduledLessonIdFilter?: Parameters.ScheduledLessonIdFilter;
        schoolIdFilter?: Parameters.SchoolIdFilter;
        searchFilter?: Parameters.SearchFilter;
        sort?: Parameters.Sort;
        startDateFilter?: Parameters.StartDateFilter;
        studentGroupIdFilter?: Parameters.StudentGroupIdFilter;
        studentIdFilter?: Parameters.StudentIdFilter;
        studentUserIdFilter?: Parameters.StudentUserIdFilter;
        teacherIdFilter?: Parameters.TeacherIdFilter;
        usernameCount?: Parameters.UsernameCount;
        utcOffset?: Parameters.UtcOffset;
    }
    namespace Responses {
        export type Assignment = Schemas.Assignment;
        export type AssignmentSubmission = Schemas.AssignmentSubmission;
        export interface AssignmentSubmissionMaterialCreationResponse {
            material: Schemas.AssignmentSubmissionMaterial;
            putLink: string; // uri
        }
        export interface AssignmentSubmissionMaterials {
            items: Schemas.AssignmentSubmissionMaterial[];
            metadata: Schemas.PaginationMetadata;
        }
        export interface AssignmentSubmissions {
            items: Schemas.AssignmentSubmission[];
            metadata: Schemas.PaginationMetadata;
        }
        export interface AttendanceRecords {
            items: Schemas.AttendanceRecord[];
            metadata: Schemas.PaginationMetadata;
        }
        export interface AttendanceRecordsWithPutLinks {
            putLinks: {
                [name: string]: /* Presigned PUT link to upload a file to the S3 storage */ Schemas.PutLink /* uri */;
            };
            records: Schemas.AttendanceRecord[];
        }
        export type Branch = Schemas.Branch;
        export interface Branches {
            items: Schemas.Branch[];
            metadata: Schemas.PaginationMetadata;
        }
        export type Client = Schemas.Client;
        export type ClientField = Schemas.ClientField;
        export type Course = Schemas.Course;
        export type Error = Schemas.Error;
        export type ExcelId = Schemas.ExcelId;
        export type Group = Schemas.Group;
        export type GroupCourse = Schemas.GroupCourse;
        export interface GroupCourseDiff {
            newAssignmentsByLesson: Schemas.LessonAssignmentsAddition[];
            newLessons: Schemas.Lesson[];
            removed: Schemas.CourseContentRemovals;
            updates: Schemas.CourseContentChanges;
        }
        export type Lesson = Schemas.Lesson;
        export type LessonSubscription = Schemas.LessonSubscription;
        export interface LessonSubscriptions {
            items: Schemas.LessonSubscription[];
            metadata: Schemas.PaginationMetadata;
        }
        export interface ManagerStudentGroupSubscriptions {
            items: Schemas.StudentGroupSubscription[];
            metadata: Schemas.PaginationMetadata;
        }
        export interface Notifications {
            items: Schemas.Notification[];
            metadata: Schemas.PaginationMetadata;
        }
        export type PointType = Schemas.PointType;
        export interface PointTypeWithOptionalPutLink {
            pointType: Schemas.PointType;
            putLink?: string; // uri
        }
        export interface PointTypeWithPutLink {
            pointType: Schemas.PointType;
            putLink: string; // uri
        }
        export interface PointWalletTransactions {
            items: Schemas.PointWalletTransaction[];
            metadata: Schemas.PaginationMetadata;
        }
        export interface PutLink {
            putLink: /* Presigned PUT link to upload a file to the S3 storage */ Schemas.PutLink /* uri */;
        }
        export type ScheduledAssignment = Schemas.ScheduledAssignment;
        export type ScheduledLesson = Schemas.ScheduledLesson;
        export type School = Schemas.School;
        export type StudyMaterial = Schemas.StudyMaterial;
        export interface StudyMaterialWithPutLink {
            putLink: string; // uri
            studyMaterial: Schemas.StudyMaterial;
        }
        export interface TeacherReports {
            items: Schemas.TeacherReport[];
            metadata: Schemas.PaginationMetadata;
        }
        export type Tokens = Schemas.Tokens;
        export type User = Schemas.User;
        export type UserStudent = Schemas.UserStudent;
    }
    namespace Schemas {
        export interface AbsenceReason {
            description?: string;
            id: UUID /* uuid */;
            isExcused: boolean;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface AbsenceReasonCreation {
            description?: string;
            isExcused: boolean;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface AbsenceReasonUpdate {
            description?: string | null;
            isExcused?: boolean | null;
            name?: string | null;
        }
        export interface Application {
            email: string; // email
            name: string;
            phone: string; // phone
        }
        export interface Assignment {
            description?: string;
            id: UUID /* uuid */;
            lessonId: UUID /* uuid */;
            maxPoints: number;
            name: string;
            order: number;
            schoolId: UUID /* uuid */;
            type: AssignmentType;
        }
        export interface AssignmentCreation {
            description?: string | null;
            lessonId: UUID /* uuid */;
            maxPoints: number;
            name: string;
            schoolId: UUID /* uuid */;
            type: AssignmentType;
        }
        export interface AssignmentSnapshot {
            description?: string | null;
            maxPoints: number;
            name: string;
            type: AssignmentType;
        }
        export interface AssignmentSubmission {
            description?: string | null;
            feedback?: string | null;
            id: UUID /* uuid */;
            points: number;
            revisedAt?: DateTime /* date-time */;
            scheduledAssignmentId: UUID /* uuid */;
            schoolId: UUID /* uuid */;
            status: AssignmentSubmissionStatus;
            student: User;
            submittedAt?: DateTime /* date-time */;
            teacherId?: UUID /* uuid */;
        }
        export interface AssignmentSubmissionCreation {
            description?: string | null;
            scheduledAssignmentId: UUID /* uuid */;
            schoolId: UUID /* uuid */;
        }
        export interface AssignmentSubmissionEvaluation {
            feedback?: string | null;
            points?: number | null;
            status: AssignmentSubmissionEvaluationStatus;
            submissionId?: UUID /* uuid */;
        }
        export type AssignmentSubmissionEvaluationStatus = "evaluate" | "revise";
        export interface AssignmentSubmissionMaterial {
            id: UUID /* uuid */;
            materialFile?: File;
            order: number;
            schoolId: UUID /* uuid */;
            submissionId: UUID /* uuid */;
        }
        export interface AssignmentSubmissionMaterialCreation {
            name: string;
            schoolId: UUID /* uuid */;
        }
        export type AssignmentSubmissionStatus = "attached" | "evaluated" | "onRevision";
        export interface AssignmentSubmissionUpdate {
            description?: string | null;
            isRevision?: boolean | null;
        }
        export type AssignmentType = "homework" | "classwork" | "test";
        export interface AssignmentUpdate {
            description?: string | null;
            maxPoints?: number | null;
            name?: string | null;
            type?: "homework" | "classwork" | "test";
        }
        export interface AssignmentsAdditionReuqest {
            assignmentIds: UUID /* uuid */[];
            scheduledLessonId: UUID /* uuid */;
        }
        export interface AttendanceRecord {
            record?: AttendanceRecordForUser;
            scheduledLesson?: MiniScheduledLesson;
            student?: MiniUser;
        }
        export interface AttendanceRecordForUser {
            absenceReason?: AbsenceReason;
            lessonSubscriptionId: UUID /* uuid */;
            proofFile?: File;
            status: AttendanceStatus;
        }
        export type AttendanceStatus = "present" | "absent" | "excused";
        export interface AvatarFileName {
            name: string; // .+\.(jpeg|jpg|png|gif|webp)$
        }
        export interface Branch {
            description?: string;
            id: UUID /* uuid */;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface BranchCreation {
            description?: string | null;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface BranchUpdate {
            description?: string | null;
            name?: string | null;
        }
        export interface ChangePassword {
            newPassword: string; // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,25}$
            oldPassword: string; // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,25}$
        }
        export interface ChangeStudentPassword {
            password: string; // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,25}$
        }
        export interface Client {
            fields: ClientFieldValue[];
            firstName: string;
            id: UUID /* uuid */;
            lastName: string;
            relatedClients: RelatedClients[];
            schoolId: UUID /* uuid */;
            user?: MiniUser;
        }
        export interface ClientCreation {
            fields: ClientFieldValueSet[];
            firstName: string;
            force?: boolean;
            lastName: string;
            schoolId: UUID /* uuid */;
        }
        export interface ClientField {
            id: UUID /* uuid */;
            isRequired: boolean;
            isUnique: boolean;
            name: string;
            options?: string[];
            order: number;
            pattern?: ClientFieldStringPattern;
            relatedName?: string;
            schoolId: UUID /* uuid */;
            type: ClientFieldType;
        }
        export interface ClientFieldCreation {
            isRequired: boolean;
            isUnique: boolean;
            name: string;
            options?: string[] | null;
            pattern?: ClientFieldStringPattern;
            relatedName?: string | null;
            schoolId: UUID /* uuid */;
            type: ClientFieldType;
        }
        export type ClientFieldStringPattern = "email" | "phone";
        export type ClientFieldType = "string" | "text" | "integer" | "float" | "date" | "boolean" | "enum" | "relationship";
        export interface ClientFieldUpdate {
            isRequired?: boolean | null;
            isUnique?: boolean | null;
            name?: string | null;
            options?: string[] | null;
            pattern?: ClientFieldStringPattern | ("none") | null;
            relatedName?: string | null;
            type?: ClientFieldType;
        }
        export interface ClientFieldValue {
            field: ClientField;
            value?: string | number | number /* double */ | boolean | DateTime /* date-time */ | MiniClient;
        }
        export interface ClientFieldValueSet {
            fieldId: UUID /* uuid */;
            value?: string | number | number /* double */ | boolean | DateTime /* date-time */ | UUID /* uuid */ | null;
        }
        export interface ClientUpdate {
            fields?: ClientFieldValueSet[] | null;
            firstName?: string | null;
            force?: boolean;
            lastName?: string | null;
        }
        export interface Course {
            description?: string;
            id: UUID /* uuid */;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface CourseContentChanges {
            /**
             * Assignments grouped by the lessons they belong to
             */
            updatedAssignmentsByLesson: LessonAssignmentChanges[];
            /**
             * Lessons that have been updated
             */
            updatedLessons: ScheduledLesson[];
        }
        export interface CourseContentRemovals {
            /**
             * Assignments that have been removed, grouped by lesson
             */
            removedAssignmentsByLesson: LessonAssignmentRemovals[];
            /**
             * Lessons that have been removed
             */
            removedLessons: ScheduledLesson[];
        }
        export interface CourseCreation {
            description?: string | null;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface CourseUpdate {
            description?: string | null;
            name?: string | null;
        }
        export type DateTime = string; // date-time
        export interface Error {
            /**
             * Same as HTTP status code
             */
            code: number;
            /**
             * Additional error properties
             */
            details?: /* Additional error properties */ ({
                acceptable?: string[] | string;
                clients?: MiniClient[];
                error: string;
                fieldId: UUID /* uuid */;
                value?: string;
            } | {
                absenceReasonId?: UUID /* uuid */;
                error: string;
                groupId?: UUID /* uuid */;
                notUniqueStudentIds?: UUID /* uuid */[];
                studentId: UUID /* uuid */;
            })[] | {
                method?: "get" | "getList" | "create" | "update" | "delete";
                resource?: "schools";
            } | {
                [name: string]: any;
            };
            /**
             * Error description
             */
            message: string;
            subcode?: /* Error code inside the service */ Subcode;
        }
        export interface ExcelId {
            id: string;
        }
        export interface File {
            name: string;
            size: /* File size in bytes */ FileSize /* int64 */;
            url: /* Presigned or normal GET link to download a file from the S3 storage */ GetLink /* uri */;
        }
        /**
         * File size in bytes
         */
        export type FileSize = number; // int64
        /**
         * Presigned or normal GET link to download a file from the S3 storage
         */
        export type GetLink = string; // uri
        export interface Group {
            branchId: UUID /* uuid */;
            description?: string;
            id: UUID /* uuid */;
            name: string;
            pointType?: PointType;
            schoolId: UUID /* uuid */;
        }
        export interface GroupCourse {
            completedAt?: DateTime /* date-time */;
            course: Course;
            groupId: UUID /* uuid */;
            hasUpdates: boolean;
            id: UUID /* uuid */;
            schedule: GroupCourseLessonsSchedule;
            schoolId: UUID /* uuid */;
            teacher: User;
        }
        export interface GroupCourseCreation {
            courseId: UUID /* uuid */;
            groupId: UUID /* uuid */;
            schedule: GroupCourseLessonsSchedule;
            schoolId: UUID /* uuid */;
            startAt: DateTime /* date-time */;
            teacherId: UUID /* uuid */;
        }
        export interface GroupCourseLessonsSchedule {
            days: GroupCourseLessonsScheduleDay[];
            utcOffset: UTCOffset;
        }
        export interface GroupCourseLessonsScheduleDay {
            endAt: Time /* time ^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$ */;
            startAt: Time /* time ^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$ */;
            weekday: Weekday;
        }
        /**
         * Request to synchronize scheduled lessons with course template updates
         */
        export interface GroupCourseSyncRequest {
            newAssignmentsByLesson?: AssignmentsAdditionReuqest[];
            /**
             * List of scheduled assignment ids to update
             */
            scheduledAssignmentIds?: UUID /* uuid */[];
            /**
             * List of scheduled lesson ids to update
             */
            scheduledLessonIds?: UUID /* uuid */[];
        }
        export interface GroupCourseUpdate {
            schedule?: GroupCourseLessonsSchedule;
            teacherId?: UUID /* uuid */;
        }
        export interface GroupCreation {
            branchId: UUID /* uuid */;
            description?: string | null;
            name: string;
            pointTypeId?: UUID /* uuid */;
            schoolId: UUID /* uuid */;
        }
        export interface GroupUpdate {
            branchId?: UUID /* uuid */;
            description?: string | null;
            name?: string | null;
            pointTypeId?: UUID /* uuid */;
        }
        export interface GroupWithSubscriptions {
            /**
             * Total amount of available lessons for this student in this group
             */
            availableLessons: number;
            group: GroupWithoutPointType;
            subscriptions: LessonSubscription[];
        }
        export interface GroupWithoutPointType {
            branchId: UUID /* uuid */;
            description?: string;
            id: UUID /* uuid */;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface HealthStatus {
            /**
             * example:
             * healthy
             */
            status: string;
            /**
             * example:
             * 72h
             */
            uptime: string;
        }
        export type Language = "ru" | "kk";
        export interface Lesson {
            courseId?: UUID /* uuid */;
            description?: string;
            id: UUID /* uuid */;
            name: string;
            order: number;
            schoolId: UUID /* uuid */;
        }
        export interface LessonAssignmentChanges {
            /**
             * List of assignments that have been updated for this lesson
             */
            assignments: ScheduledAssignment[];
            lesson: ScheduledLesson;
        }
        export interface LessonAssignmentRemovals {
            /**
             * List of assignments that have been removed from this lesson
             */
            assignments: ScheduledAssignment[];
            lesson: ScheduledLesson;
        }
        export interface LessonAssignmentsAddition {
            /**
             * List of assignments that have been added to this lesson
             */
            assignments: Assignment[];
            scheduledLesson: ScheduledLesson;
        }
        export interface LessonCreation {
            courseId?: UUID /* uuid */;
            description?: string | null;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface LessonSnapshot {
            description: string | null;
            name: string;
        }
        export interface LessonSubscription {
            closedAt?: DateTime /* date-time */;
            createdAt: DateTime /* date-time */;
            description?: string | null;
            id: UUID /* uuid */;
            lessonsCount: number;
            lessonsLeft: number;
            price: number;
            studentGroupId: UUID /* uuid */;
            studentUserId: UUID /* uuid */;
        }
        export interface LessonSubscriptionCreation {
            description?: string | null;
            lessonsCount: number;
            price: number;
            studentGroupId: UUID /* uuid */;
            studentUserId: UUID /* uuid */;
        }
        export interface LessonUpdate {
            description?: string | null;
            name?: string | null;
        }
        export interface Login {
            /**
             * example:
             * school
             */
            domain: string; // ^[a-z0-9][a-z0-9-]{3,13}[a-z0-9]$
            password: string; // password
            username: string;
        }
        export interface MiniAssignmentSubmission {
            id: UUID /* uuid */;
            scheduledAssignment: MiniScheduledAssignment;
        }
        export interface MiniClient {
            firstName: string;
            id: UUID /* uuid */;
            lastName: string;
            schoolId: UUID /* uuid */;
            userId?: UUID /* uuid */;
        }
        export interface MiniScheduledAssignment {
            assignmentSnapshot: AssignmentSnapshot;
            id: UUID /* uuid */;
        }
        export interface MiniScheduledLesson {
            endAt: DateTime /* date-time */;
            groupCourseId: UUID /* uuid */;
            id: UUID /* uuid */;
            isActive: boolean;
            lessonSnapshot: LessonSnapshot;
            schoolId: UUID /* uuid */;
            startAt: DateTime /* date-time */;
            teacherId: UUID /* uuid */;
        }
        export interface MiniUser {
            avatar?: File;
            firstName: string;
            id: UUID /* uuid */;
            lastName: string;
            schoolId?: UUID /* uuid */;
            username: string;
        }
        export interface Notification {
            createdAt: DateTime /* date-time */;
            id: UUID /* uuid */;
            isRead: boolean;
            parameters?: NotificationParametersLessonSubscriptionExpiring;
            type: NotificationType;
        }
        export interface NotificationParametersLessonSubscriptionExpiring {
            lessonsLeft: number;
        }
        export type NotificationType = "lessonSubscriptionExpiring";
        export interface OrderChanging {
            order: string /* uuid */[];
        }
        export interface PaginationMetadata {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        }
        export interface PointAmountTransaction {
            description: string;
            points: number; // int64
        }
        export interface PointType {
            id: UUID /* uuid */;
            name: string;
            pointFile?: File;
            schoolId: UUID /* uuid */;
        }
        export interface PointTypeCreation {
            fileName: string;
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface PointTypeUpdate {
            fileName?: string | null;
            name?: string | null;
        }
        export interface PointWallet {
            id: UUID /* uuid */;
            pointType?: PointType;
            points: number; // int64
        }
        export interface PointWalletTransaction {
            assignmentSubmission?: MiniAssignmentSubmission;
            createdAt: DateTime /* date-time */;
            description?: string;
            id: UUID /* uuid */;
            initiator: MiniUser;
            pointWalletId: UUID /* uuid */;
            points: number; // int64
            type: PointWalletTransactionType;
        }
        export type PointWalletTransactionType = "initialCredit" | "adjustmentCredit" | "adjustmentDebit" | "manualDebit" | "manualCredit";
        /**
         * Presigned PUT link to upload a file to the S3 storage
         */
        export type PutLink = string; // uri
        export interface RecoveryPassword {
            newPassword: string; // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,25}$
            token: string;
        }
        export interface RecoveryPasswordSendLink {
            /**
             * example:
             * school
             */
            domain: string; // ^[a-z0-9][a-z0-9-]{3,13}[a-z0-9]$
            email: string; // email
        }
        export interface RelatedClients {
            clients: MiniClient[];
            field: ClientField;
        }
        export interface ScheduledAssignment {
            assignment: Assignment;
            assignmentSnapshot: AssignmentSnapshot;
            deadline?: DateTime /* date-time */;
            id: UUID /* uuid */;
            scheduledLessonId: UUID /* uuid */;
            schoolId: UUID /* uuid */;
            studentAssignmentSubmission?: StudentAssignmentSubmission;
        }
        export interface ScheduledAssignmentCreation {
            assignmentId: UUID /* uuid */;
            deadline?: string | null; // date-time
            scheduledLessonId: UUID /* uuid */;
            schoolId: UUID /* uuid */;
        }
        export interface ScheduledAssignmentUpdate {
            deadline?: string | null; // date-time
        }
        export interface ScheduledLesson {
            endAt: DateTime /* date-time */;
            groupCourseId: UUID /* uuid */;
            id: UUID /* uuid */;
            isActive: boolean;
            lessonSnapshot: LessonSnapshot;
            schoolId: UUID /* uuid */;
            startAt: DateTime /* date-time */;
            teacherId: UUID /* uuid */;
            lesson: Lesson;
        }
        export interface ScheduledLessonCreation {
            endAt: DateTime /* date-time */;
            groupCourseId: UUID /* uuid */;
            lessonId: UUID /* uuid */;
            schoolId: UUID /* uuid */;
            startAt: DateTime /* date-time */;
            teacherId: UUID /* uuid */;
        }
        export interface ScheduledLessonShift {
            number: number;
        }
        export interface ScheduledLessonUpdate {
            endAt?: DateTime /* date-time */;
            isActive?: boolean;
            startAt?: DateTime /* date-time */;
            teacherId?: UUID /* uuid */;
        }
        export interface School {
            description?: string;
            domain: string;
            fileSize: number; // int64
            id: UUID /* uuid */;
            name: string;
        }
        export interface SchoolCreation {
            description?: string | null;
            domain: string; // ^[a-z0-9][a-z0-9-]{3,13}[a-z0-9]$
            name: string;
        }
        export interface SchoolUpdate {
            description?: string | null;
            name?: string | null;
        }
        export interface SchoolUsernames {
            usernames: string[];
        }
        export interface SetAttendanceRecord {
            absenceReasonId?: string | null; // uuid
            isPresent: boolean;
            proofFileName?: string | null;
            studentId: UUID /* uuid */;
        }
        export interface SetAttendanceRecords {
            /**
             * Status for students not in the list
             */
            defaultIsPresent?: boolean | null;
            records: SetAttendanceRecord[];
        }
        export interface SimpleClient {
            fields: ClientFieldValue[];
            firstName: string;
            id: UUID /* uuid */;
            lastName: string;
            schoolId: UUID /* uuid */;
            user?: MiniUser;
        }
        export type SortDirection = "asc" | "desc";
        export interface StudentAssignmentSubmission {
            id: UUID /* uuid */;
            points: number;
            status: AssignmentSubmissionStatus;
        }
        export interface StudentGroupSubscription {
            groups: GroupWithSubscriptions[];
            student: MiniClient;
        }
        export interface StudentSchedule {
            course: Course;
            scheduledLesson: ScheduledLesson;
        }
        export interface StudyMaterial {
            assignmentId?: UUID /* uuid */;
            description?: string;
            id: UUID /* uuid */;
            lessonId?: UUID /* uuid */;
            materialFile?: File;
            name: string;
            order: number;
            schoolId: UUID /* uuid */;
        }
        export interface StudyMaterialCreation {
            assignmentId?: string | null; // uuid
            description?: string | null;
            fileName?: string | null;
            lessonId?: string | null; // uuid
            name: string;
            schoolId: UUID /* uuid */;
        }
        export interface StudyMaterialUpdate {
            description?: string | null;
            name?: string | null;
        }
        /**
         * Error code inside the service
         */
        export type Subcode = "resource.noAccess" | "entity.noAccess" | "token.invalid" | "token.wrong" | "session.notFound" | "session.userDoesNotMatch" | "cooldown.notElapsed" | "code.tooMany" | "code.wrong" | "code.expired" | "tries.tooMany" | "tokens.tooMany" | "school.domain.alreadyExists" | "school.domain.notFound" | "school.domain.invalid" | "user.notManager" | "user.role.noAccess" | "user.username.invalid" | "user.username.alreadyExists" | "user.password.wrong" | "user.email.notConfirmed" | "user.email.alreadyExists" | "fieldValue.invalid" | "order.alreadyTaken" | "entities.tooMany" | "group.student.alreadyExists" | "group.student.removed" | "group.student.alreadyRemoved" | "group.wallet.notEnoughPoints" | "branch.manager.alreadyExists" | "scheduledLessons.attendance.set" | "scheduledLessons.attendance.get.badValue" | "scheduledLessons.groupCourseId.required" | "student.lessonSubscription.alreadyClosed" | "groupCourse.alreadyCompleted" | "groupCourse.completed" | "groupCourse.schedule.nonUniqueWeekdays" | "groupCourse.schedule.invalid" | "pointType.name.alreadyExists" | "notification.alreadyRead";
        export interface TeacherReport {
            course: Course;
            group: GroupWithoutPointType;
            scheduledLesson: MiniScheduledLesson;
            studentsCount: number;
        }
        export type Time = string; // time ^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$
        export interface Token {
            token: string;
        }
        export interface Tokens {
            access: string;
            refresh: string;
        }
        export type UTCOffset = number;
        export type UUID = string; // uuid
        export interface User {
            avatar?: File;
            clientId?: UUID /* uuid */;
            description?: string;
            firstName: string;
            id: UUID /* uuid */;
            language: Language;
            lastName: string;
            notificationCount: number;
            roles: UserRole[];
            schoolId?: UUID /* uuid */;
            username: string;
        }
        export interface UserCreation {
            clientId?: UUID /* uuid */;
            description?: string | null;
            firstName: string;
            lastName: string;
            password: string; // password ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,25}$
            roles: UserRole[];
            schoolId: UUID /* uuid */;
            username: string; // ^(?=[a-zA-Z0-9_-]*[a-zA-Z])[a-zA-Z0-9_-]{4,20}$
        }
        export interface UserRegistration {
            description?: string | null;
            email: string; // email
            firstName: string;
            lastName: string;
            password: string; // password ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,25}$
            school: SchoolCreation;
            token: string;
            username: string; // ^(?=[a-zA-Z0-9_-]*[a-zA-Z])[a-zA-Z0-9_-]{4,20}$
        }
        export interface UserRegistrationConfirmEmail {
            code: string;
            email: string; // email
        }
        export interface UserRegistrationEmail {
            email: string; // email
        }
        export type UserRole = "admin" | "director" | "manager" | "methodist" | "teacher" | "client";
        export interface UserStudent {
            avatar?: File;
            clientId: UUID /* uuid */;
            description?: string;
            email?: string; // email
            firstName: string;
            id: UUID /* uuid */;
            language: Language;
            lastName: string;
            notificationCount: number;
            pointWallets: PointWallet[];
            schoolId: UUID /* uuid */;
            totalPoints: number; // int64
            username: string;
        }
        export interface UserUpdate {
            description?: string | null;
            firstName?: string | null;
            language?: Language;
            lastName?: string | null;
            roles?: UserRole[] | null;
        }
        export type Weekday = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
    }
}
declare namespace Paths {
    namespace AddManagerToBranch {
        namespace Parameters {
            export type BranchId = Components.Schemas.UUID /* uuid */;
            export type ManagerId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            branchId: Parameters.BranchId;
            managerId: Parameters.ManagerId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace AddStudentToGroup {
        namespace Parameters {
            export type GroupId = Components.Schemas.UUID /* uuid */;
            export type StudentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupId: Parameters.GroupId;
            studentId: Parameters.StudentId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ChangeAssignmentStudyMaterialsOrder {
        namespace Parameters {
            export type AssignmentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentId: Parameters.AssignmentId;
        }
        export type RequestBody = Components.Schemas.OrderChanging;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ChangeAssignmentSubmissionMaterialsOrder {
        namespace Parameters {
            export type AssignmentSubmissionId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentSubmissionId: Parameters.AssignmentSubmissionId;
        }
        export type RequestBody = Components.Schemas.OrderChanging;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ChangeAssignmentsOrder {
        namespace Parameters {
            export type LessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            lessonId: Parameters.LessonId;
        }
        export type RequestBody = Components.Schemas.OrderChanging;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ChangeClientFieldsOrder {
        namespace Parameters {
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            schoolId: Parameters.SchoolId;
        }
        export type RequestBody = Components.Schemas.OrderChanging;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ChangeLessonStudyMaterialsOrder {
        namespace Parameters {
            export type LessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            lessonId: Parameters.LessonId;
        }
        export type RequestBody = Components.Schemas.OrderChanging;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ChangeLessonsOrder {
        namespace Parameters {
            export type CourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            courseId: Parameters.CourseId;
        }
        export type RequestBody = Components.Schemas.OrderChanging;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ChangePassword {
        export type RequestBody = Components.Schemas.ChangePassword;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ChangeStudentPassword {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.ChangeStudentPassword;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace CloseLessonSubscription {
        namespace Parameters {
            export type LessonSubscriptionId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            lessonSubscriptionId: Parameters.LessonSubscriptionId;
        }
        namespace Responses {
            export type $200 = Components.Responses.LessonSubscription;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CompleteGroupCourse {
        namespace Parameters {
            export type GroupCourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupCourseId: Parameters.GroupCourseId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GroupCourse;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateAbsenceReason {
        export type RequestBody = Components.Schemas.AbsenceReasonCreation;
        namespace Responses {
            export type $200 = Components.Schemas.AbsenceReason;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateApplication {
        export type RequestBody = Components.Schemas.Application;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateAssignment {
        export type RequestBody = Components.Schemas.AssignmentCreation;
        namespace Responses {
            export type $200 = Components.Responses.Assignment;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateAssignmentSubmission {
        export type RequestBody = Components.Schemas.AssignmentSubmissionCreation;
        namespace Responses {
            export type $200 = Components.Responses.AssignmentSubmission;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateAssignmentSubmissionMaterial {
        namespace Parameters {
            export type AssignmentSubmissionId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentSubmissionId: Parameters.AssignmentSubmissionId;
        }
        export type RequestBody = Components.Schemas.AssignmentSubmissionMaterialCreation;
        namespace Responses {
            export type $200 = Components.Responses.AssignmentSubmissionMaterialCreationResponse;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateBranch {
        export type RequestBody = Components.Schemas.BranchCreation;
        namespace Responses {
            export type $200 = Components.Responses.Branch;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateClient {
        export type RequestBody = Components.Schemas.ClientCreation;
        namespace Responses {
            export type $200 = Components.Responses.Client;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateClientField {
        export type RequestBody = Components.Schemas.ClientFieldCreation;
        namespace Responses {
            export type $200 = Components.Responses.ClientField;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateCourse {
        export type RequestBody = Components.Schemas.CourseCreation;
        namespace Responses {
            export type $200 = Components.Responses.Course;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateGroup {
        export type RequestBody = Components.Schemas.GroupCreation;
        namespace Responses {
            export type $200 = Components.Responses.Group;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateGroupCourse {
        export type RequestBody = Components.Schemas.GroupCourseCreation;
        namespace Responses {
            export type $200 = Components.Responses.GroupCourse;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateLesson {
        export type RequestBody = Components.Schemas.LessonCreation;
        namespace Responses {
            export type $200 = Components.Responses.Lesson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateLessonSubscription {
        export type RequestBody = Components.Schemas.LessonSubscriptionCreation;
        namespace Responses {
            export type $200 = Components.Responses.LessonSubscription;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreatePointType {
        export type RequestBody = Components.Schemas.PointTypeCreation;
        namespace Responses {
            export type $200 = Components.Responses.PointTypeWithPutLink;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateScheduledAssignment {
        export type RequestBody = Components.Schemas.ScheduledAssignmentCreation;
        namespace Responses {
            export type $200 = Components.Responses.ScheduledAssignment;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateScheduledLesson {
        export type RequestBody = Components.Schemas.ScheduledLessonCreation;
        namespace Responses {
            export type $200 = Components.Responses.ScheduledLesson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateSchool {
        export type RequestBody = Components.Schemas.SchoolCreation;
        namespace Responses {
            export type $200 = Components.Responses.School;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateStudyMaterial {
        export type RequestBody = Components.Schemas.StudyMaterialCreation;
        namespace Responses {
            export type $200 = Components.Responses.StudyMaterialWithPutLink;
            export type Default = Components.Responses.Error;
        }
    }
    namespace CreateUser {
        export type RequestBody = Components.Schemas.UserCreation;
        namespace Responses {
            export type $200 = Components.Responses.User;
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteAbsenceReason {
        namespace Parameters {
            export type AbsenceReasonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            absenceReasonId: Parameters.AbsenceReasonId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteAssignment {
        namespace Parameters {
            export type AssignmentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentId: Parameters.AssignmentId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteAssignmentSubmission {
        namespace Parameters {
            export type AssignmentSubmissionId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentSubmissionId: Parameters.AssignmentSubmissionId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteAssignmentSubmissionMaterial {
        namespace Parameters {
            export type AssignmentSubmissionMaterialId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentSubmissionMaterialId: Parameters.AssignmentSubmissionMaterialId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteBranch {
        namespace Parameters {
            export type BranchId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            branchId: Parameters.BranchId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteClient {
        namespace Parameters {
            export type ClientId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            clientId: Parameters.ClientId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteClientField {
        namespace Parameters {
            export type FieldId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            fieldId: Parameters.FieldId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteCourse {
        namespace Parameters {
            export type CourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            courseId: Parameters.CourseId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteGroup {
        namespace Parameters {
            export type GroupId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupId: Parameters.GroupId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteGroupCourse {
        namespace Parameters {
            export type GroupCourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupCourseId: Parameters.GroupCourseId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteLesson {
        namespace Parameters {
            export type LessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            lessonId: Parameters.LessonId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteNotification {
        namespace Parameters {
            export type NotificationId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            notificationId: Parameters.NotificationId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeletePointType {
        namespace Parameters {
            export type PointTypeId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            pointTypeId: Parameters.PointTypeId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteScheduledAssignment {
        namespace Parameters {
            export type ScheduledAssignmentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledAssignmentId: Parameters.ScheduledAssignmentId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteScheduledLesson {
        namespace Parameters {
            export type ScheduledLessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledLessonId: Parameters.ScheduledLessonId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteSchool {
        namespace Parameters {
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            schoolId: Parameters.SchoolId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteStudyMaterial {
        namespace Parameters {
            export type StudyMaterialId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            studyMaterialId: Parameters.StudyMaterialId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteUser {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace DeleteUserAvatar {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace EvaluateStudentAssignment {
        namespace Parameters {
            export type ScheduledAssignmentId = Components.Schemas.UUID /* uuid */;
            export type StudentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledAssignmentId: Parameters.ScheduledAssignmentId;
            studentId: Parameters.StudentId;
        }
        export type RequestBody = Components.Schemas.AssignmentSubmissionEvaluation;
        namespace Responses {
            export type $200 = Components.Schemas.AssignmentSubmission;
            export type $201 = Components.Schemas.AssignmentSubmission;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAbsenceReason {
        namespace Parameters {
            export type AbsenceReasonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            absenceReasonId: Parameters.AbsenceReasonId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AbsenceReason;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAbsenceReasons {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.AbsenceReason[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAssignment {
        namespace Parameters {
            export type AssignmentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentId: Parameters.AssignmentId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Assignment;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAssignmentSubmission {
        namespace Parameters {
            export type AssignmentSubmissionId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentSubmissionId: Parameters.AssignmentSubmissionId;
        }
        namespace Responses {
            export type $200 = Components.Responses.AssignmentSubmission;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAssignmentSubmissionMaterial {
        namespace Parameters {
            export type AssignmentSubmissionMaterialId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentSubmissionMaterialId: Parameters.AssignmentSubmissionMaterialId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AssignmentSubmissionMaterial;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAssignmentSubmissionMaterials {
        namespace Parameters {
            export type AssignmentSubmissionId = Components.Schemas.UUID /* uuid */;
            export type Page = number;
            export type PageSize = number;
        }
        export interface PathParameters {
            assignmentSubmissionId: Parameters.AssignmentSubmissionId;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export type $200 = Components.Responses.AssignmentSubmissionMaterials;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAssignmentSubmissions {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
            export type ScheduledAssignmentId = Components.Schemas.UUID /* uuid */;
            export type StudentId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            scheduledAssignmentId?: Parameters.ScheduledAssignmentId;
            studentId?: Parameters.StudentId;
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export type $200 = Components.Responses.AssignmentSubmissions;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAssignments {
        namespace Parameters {
            export type AssignmentType = Components.Schemas.AssignmentType;
            export type LessonId = Components.Schemas.UUID /* uuid */;
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            lessonId?: Parameters.LessonId;
            assignmentType?: Parameters.AssignmentType;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.Assignment[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetAttendanceRecords {
        namespace Parameters {
            export type GroupCourseId = Components.Schemas.UUID /* uuid */;
            export type Inverse = boolean;
            export type Page = number;
            export type PageSize = number;
            export type ScheduledLessonId = Components.Schemas.UUID /* uuid */;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
            export type StudentId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            scheduledLessonId?: Parameters.ScheduledLessonId;
            studentId?: Parameters.StudentId;
            groupCourseId?: Parameters.GroupCourseId;
            schoolId?: Parameters.SchoolId;
            inverse?: Parameters.Inverse;
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export type $200 = Components.Responses.AttendanceRecords;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetBranch {
        namespace Parameters {
            export type BranchId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            branchId: Parameters.BranchId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Branch;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetBranches {
        namespace Parameters {
            export type ManagerId = Components.Schemas.UUID /* uuid */;
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            managerId?: Parameters.ManagerId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Branches;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetClient {
        namespace Parameters {
            export type ClientId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            clientId: Parameters.ClientId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Client;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetClientField {
        namespace Parameters {
            export type FieldId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            fieldId: Parameters.FieldId;
        }
        namespace Responses {
            export type $200 = Components.Responses.ClientField;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetClientFields {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.ClientField[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetClients {
        namespace Parameters {
            /**
             * A value or range of values to filter on the values of a specific field. Range works only for fields of type [integer, float, date], for this you need to pass the value in the form "from;to". Filtering by substrings works for [string, text]. Other types will be filtered by exact match
             */
            export interface Fields {
                [name: string]: string;
            }
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
            export type Search = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            search?: Parameters.Search;
            fields?: /* A value or range of values to filter on the values of a specific field. Range works only for fields of type [integer, float, date], for this you need to pass the value in the form "from;to". Filtering by substrings works for [string, text]. Other types will be filtered by exact match */ Parameters.Fields;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.SimpleClient[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetCourse {
        namespace Parameters {
            export type CourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            courseId: Parameters.CourseId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Course;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetCourses {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
            export type Search = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            search?: Parameters.Search;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.Course[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetGroup {
        namespace Parameters {
            export type GroupId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupId: Parameters.GroupId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Group;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetGroupCourse {
        namespace Parameters {
            export type GroupCourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupCourseId: Parameters.GroupCourseId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GroupCourse;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetGroupCourseDiff {
        namespace Parameters {
            export type GroupCourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupCourseId: Parameters.GroupCourseId;
        }
        namespace Responses {
            export type $200 = Components.Responses.GroupCourseDiff;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetGroupCourses {
        namespace Parameters {
            export type CourseId = Components.Schemas.UUID /* uuid */;
            export type GroupId = Components.Schemas.UUID /* uuid */;
            export type IsCompleted = boolean;
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
            export type StudentId = Components.Schemas.UUID /* uuid */;
            export type TeacherId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            courseId?: Parameters.CourseId;
            teacherId?: Parameters.TeacherId;
            groupId?: Parameters.GroupId;
            studentId?: Parameters.StudentId;
            isCompleted?: Parameters.IsCompleted;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.GroupCourse[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetGroups {
        namespace Parameters {
            export type BranchId = Components.Schemas.UUID /* uuid */;
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
            export type StudentId = Components.Schemas.UUID /* uuid */;
            export type TeacherId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            studentId?: Parameters.StudentId;
            teacherId?: Parameters.TeacherId;
            branchId?: Parameters.BranchId;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.Group[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetHealth {
        namespace Responses {
            export type $200 = Components.Schemas.HealthStatus;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetLesson {
        namespace Parameters {
            export type LessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            lessonId: Parameters.LessonId;
        }
        namespace Responses {
            export type $200 = Components.Responses.Lesson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetLessonSubscription {
        namespace Parameters {
            export type LessonSubscriptionId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            lessonSubscriptionId: Parameters.LessonSubscriptionId;
        }
        namespace Responses {
            export type $200 = Components.Responses.LessonSubscription;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetLessonSubscriptions {
        namespace Parameters {
            export type IsClosed = boolean;
            export type Page = number;
            export type PageSize = number;
            export type StudentGroupId = Components.Schemas.UUID /* uuid */;
            export type StudentUserId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            studentUserId: Parameters.StudentUserId;
            studentGroupId: Parameters.StudentGroupId;
            isClosed?: Parameters.IsClosed;
        }
        namespace Responses {
            export type $200 = Components.Responses.LessonSubscriptions;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetLessons {
        namespace Parameters {
            export type CourseId = Components.Schemas.UUID /* uuid */;
            export type LessonIds = Components.Schemas.UUID /* uuid */[];
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            courseId?: Parameters.CourseId;
            lessonIds?: Parameters.LessonIds;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.Lesson[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetManagerStudentGroupSubscriptions {
        namespace Parameters {
            export type BranchId = Components.Schemas.UUID /* uuid */;
            export type GroupId = Components.Schemas.UUID /* uuid */;
            export type Page = number;
            export type PageSize = number;
            export type Search = string;
        }
        export interface QueryParameters {
            branchId?: Parameters.BranchId;
            groupId?: Parameters.GroupId;
            search?: Parameters.Search;
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export type $200 = Components.Responses.ManagerStudentGroupSubscriptions;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetNotifications {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export type $200 = Components.Responses.Notifications;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetOpenAPIJSON {
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetOpenAPIYAML {
        namespace Responses {
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetPointType {
        namespace Parameters {
            export type PointTypeId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            pointTypeId: Parameters.PointTypeId;
        }
        namespace Responses {
            export type $200 = Components.Responses.PointType;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetPointTypes {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.PointType[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetScheduledAssignment {
        namespace Parameters {
            export type ScheduledAssignmentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledAssignmentId: Parameters.ScheduledAssignmentId;
        }
        namespace Responses {
            export type $200 = Components.Responses.ScheduledAssignment;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetScheduledAssignments {
        namespace Parameters {
            export type AssignmentId = Components.Schemas.UUID /* uuid */;
            export type AssignmentType = Components.Schemas.AssignmentType;
            export type Page = number;
            export type PageSize = number;
            export type ScheduledLessonId = Components.Schemas.UUID /* uuid */;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            assignmentId?: Parameters.AssignmentId;
            scheduledLessonId?: Parameters.ScheduledLessonId;
            assignmentType?: Parameters.AssignmentType;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.ScheduledAssignment[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetScheduledLesson {
        namespace Parameters {
            export type ScheduledLessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledLessonId: Parameters.ScheduledLessonId;
        }
        namespace Responses {
            export type $200 = Components.Responses.ScheduledLesson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetScheduledLessons {
        namespace Parameters {
            export type GroupCourseId = Components.Schemas.UUID /* uuid */;
            export type IsActive = boolean;
            export type LessonId = Components.Schemas.UUID /* uuid */;
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
            export type Sort = Components.Schemas.SortDirection;
            export type TeacherId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            sort?: Parameters.Sort;
            schoolId?: Parameters.SchoolId;
            teacherId?: Parameters.TeacherId;
            lessonId?: Parameters.LessonId;
            groupCourseId?: Parameters.GroupCourseId;
            isActive?: Parameters.IsActive;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.ScheduledLesson[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetSchool {
        namespace Parameters {
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            schoolId: Parameters.SchoolId;
        }
        namespace Responses {
            export type $200 = Components.Responses.School;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetSchoolUsernames {
        namespace Parameters {
            export type Count = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            schoolId: Parameters.SchoolId;
        }
        export interface QueryParameters {
            count?: Parameters.Count;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SchoolUsernames;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetSchools {
        namespace Parameters {
            export type DirectorId = Components.Schemas.UUID /* uuid */;
            export type Page = number;
            export type PageSize = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            directorId?: Parameters.DirectorId;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.School[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetStudentSchedule {
        namespace Parameters {
            export type EndDate = Components.Schemas.DateTime /* date-time */;
            export type GroupId = Components.Schemas.UUID /* uuid */;
            export type IsActive = boolean;
            export type Page = number;
            export type PageSize = number;
            export type StartDate = Components.Schemas.DateTime /* date-time */;
            export type StudentId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            studentId?: Parameters.StudentId;
            groupId?: Parameters.GroupId;
            isActive?: Parameters.IsActive;
            startDate?: Parameters.StartDate;
            endDate?: Parameters.EndDate;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.StudentSchedule[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetStudyMaterial {
        namespace Parameters {
            export type StudyMaterialId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            studyMaterialId: Parameters.StudyMaterialId;
        }
        namespace Responses {
            export type $200 = Components.Responses.StudyMaterial;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetStudyMaterials {
        namespace Parameters {
            export type AssignmentId = Components.Schemas.UUID /* uuid */;
            export type LessonId = Components.Schemas.UUID /* uuid */;
            export type Page = number;
            export type PageSize = number;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            lessonId?: Parameters.LessonId;
            assignmentId?: Parameters.AssignmentId;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.StudyMaterial[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetUser {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Responses.User;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetUserStudent {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Responses.UserStudent;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GetUsers {
        namespace Parameters {
            export type GroupId = Components.Schemas.UUID /* uuid */;
            export type OnlyEmployees = boolean;
            export type Page = number;
            export type PageSize = number;
            export type RemovedFromGroup = boolean;
            export type Role = Components.Schemas.UserRole;
            export type SchoolId = Components.Schemas.UUID /* uuid */;
            export type Search = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            schoolId?: Parameters.SchoolId;
            groupId?: Parameters.GroupId;
            removedFromGroup?: Parameters.RemovedFromGroup;
            role?: Parameters.Role;
            onlyEmployees?: Parameters.OnlyEmployees;
            search?: Parameters.Search;
        }
        namespace Responses {
            export interface $200 {
                items: Components.Schemas.User[];
                metadata: Components.Schemas.PaginationMetadata;
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace Login {
        export type RequestBody = Components.Schemas.Login;
        namespace Responses {
            export type $200 = Components.Responses.Tokens;
            export type Default = Components.Responses.Error;
        }
    }
    namespace Logout {
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ReadNotification {
        namespace Parameters {
            export type NotificationId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            notificationId: Parameters.NotificationId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace RecoveryPassword {
        export type RequestBody = Components.Schemas.RecoveryPassword;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace RecoveryPasswordSendLink {
        export type RequestBody = Components.Schemas.RecoveryPasswordSendLink;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace Refresh {
        export type RequestBody = Components.Schemas.Token;
        namespace Responses {
            export type $200 = Components.Responses.Tokens;
            export type Default = Components.Responses.Error;
        }
    }
    namespace Register {
        export type RequestBody = Components.Schemas.UserRegistration;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace RegisterConfirmEmail {
        export type RequestBody = Components.Schemas.UserRegistrationConfirmEmail;
        namespace Responses {
            export type $200 = Components.Schemas.Token;
            export type Default = Components.Responses.Error;
        }
    }
    namespace RegisterSendCode {
        export type RequestBody = Components.Schemas.UserRegistrationEmail;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace RemoveManagerFromBranch {
        namespace Parameters {
            export type BranchId = Components.Schemas.UUID /* uuid */;
            export type ManagerId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            branchId: Parameters.BranchId;
            managerId: Parameters.ManagerId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace RemoveStudentFromGroup {
        namespace Parameters {
            export type GroupId = Components.Schemas.UUID /* uuid */;
            export type StudentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupId: Parameters.GroupId;
            studentId: Parameters.StudentId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace ScheduledLessonShift {
        namespace Parameters {
            export type ScheduledLessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledLessonId: Parameters.ScheduledLessonId;
        }
        export type RequestBody = Components.Schemas.ScheduledLessonShift;
        namespace Responses {
            export type $200 = Components.Responses.ScheduledLesson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace SetScheduledLessonAttendanceRecords {
        namespace Parameters {
            export type ScheduledLessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledLessonId: Parameters.ScheduledLessonId;
        }
        export type RequestBody = Components.Schemas.SetAttendanceRecords;
        namespace Responses {
            export type $200 = Components.Responses.AttendanceRecordsWithPutLinks;
            export type Default = Components.Responses.Error;
        }
    }
    namespace SyncGroupCourse {
        namespace Parameters {
            export type GroupCourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupCourseId: Parameters.GroupCourseId;
        }
        export type RequestBody = /* Request to synchronize scheduled lessons with course template updates */ Components.Schemas.GroupCourseSyncRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ScheduledLesson[];
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateAbsenceReason {
        namespace Parameters {
            export type AbsenceReasonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            absenceReasonId: Parameters.AbsenceReasonId;
        }
        export type RequestBody = Components.Schemas.AbsenceReasonUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.AbsenceReason;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateAssignment {
        namespace Parameters {
            export type AssignmentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentId: Parameters.AssignmentId;
        }
        export type RequestBody = Components.Schemas.AssignmentUpdate;
        namespace Responses {
            export type $200 = Components.Responses.Assignment;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateAssignmentSubmission {
        namespace Parameters {
            export type AssignmentSubmissionId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            assignmentSubmissionId: Parameters.AssignmentSubmissionId;
        }
        export type RequestBody = Components.Schemas.AssignmentSubmissionUpdate;
        namespace Responses {
            export interface $200 {
                assignmentSubmissions?: Components.Schemas.AssignmentSubmission[];
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateBranch {
        namespace Parameters {
            export type BranchId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            branchId: Parameters.BranchId;
        }
        export type RequestBody = Components.Schemas.BranchUpdate;
        namespace Responses {
            export type $200 = Components.Responses.Branch;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateClient {
        namespace Parameters {
            export type ClientId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            clientId: Parameters.ClientId;
        }
        export type RequestBody = Components.Schemas.ClientUpdate;
        namespace Responses {
            export type $200 = Components.Responses.Client;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateClientField {
        namespace Parameters {
            export type FieldId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            fieldId: Parameters.FieldId;
        }
        export type RequestBody = Components.Schemas.ClientFieldUpdate;
        namespace Responses {
            export type $200 = Components.Responses.ClientField;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateCourse {
        namespace Parameters {
            export type CourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            courseId: Parameters.CourseId;
        }
        export type RequestBody = Components.Schemas.CourseUpdate;
        namespace Responses {
            export type $200 = Components.Responses.Course;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateGroup {
        namespace Parameters {
            export type GroupId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupId: Parameters.GroupId;
        }
        export type RequestBody = Components.Schemas.GroupUpdate;
        namespace Responses {
            export type $200 = Components.Responses.Group;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateGroupCourse {
        namespace Parameters {
            export type GroupCourseId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            groupCourseId: Parameters.GroupCourseId;
        }
        export type RequestBody = Components.Schemas.GroupCourseUpdate;
        namespace Responses {
            export type $200 = Components.Responses.GroupCourse;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateLesson {
        namespace Parameters {
            export type LessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            lessonId: Parameters.LessonId;
        }
        export type RequestBody = Components.Schemas.LessonUpdate;
        namespace Responses {
            export type $200 = Components.Responses.Lesson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdatePointType {
        namespace Parameters {
            export type PointTypeId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            pointTypeId: Parameters.PointTypeId;
        }
        export type RequestBody = Components.Schemas.PointTypeUpdate;
        namespace Responses {
            export type $200 = Components.Responses.PointTypeWithOptionalPutLink;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateScheduledAssignment {
        namespace Parameters {
            export type ScheduledAssignmentId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledAssignmentId: Parameters.ScheduledAssignmentId;
        }
        export type RequestBody = Components.Schemas.ScheduledAssignmentUpdate;
        namespace Responses {
            export type $200 = Components.Responses.ScheduledAssignment;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateScheduledLesson {
        namespace Parameters {
            export type ScheduledLessonId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            scheduledLessonId: Parameters.ScheduledLessonId;
        }
        export type RequestBody = Components.Schemas.ScheduledLessonUpdate;
        namespace Responses {
            export type $200 = Components.Responses.ScheduledLesson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateSchool {
        namespace Parameters {
            export type SchoolId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            schoolId: Parameters.SchoolId;
        }
        export type RequestBody = Components.Schemas.SchoolUpdate;
        namespace Responses {
            export type $200 = Components.Responses.School;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateStudyMaterial {
        namespace Parameters {
            export type StudyMaterialId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            studyMaterialId: Parameters.StudyMaterialId;
        }
        export type RequestBody = Components.Schemas.StudyMaterialUpdate;
        namespace Responses {
            export type $200 = Components.Responses.StudyMaterial;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateUser {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.UserUpdate;
        namespace Responses {
            export type $200 = Components.Responses.User;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UpdateUserAvatar {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.AvatarFileName;
        namespace Responses {
            export type $200 = Components.Responses.PutLink;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UserStudentWalletsManualCredit {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
            export type WalletId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
            walletId: Parameters.WalletId;
        }
        export type RequestBody = Components.Schemas.PointAmountTransaction;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace UserStudentWalletsManualDebit {
        namespace Parameters {
            export type UserId = Components.Schemas.UUID /* uuid */;
            export type WalletId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
            walletId: Parameters.WalletId;
        }
        export type RequestBody = Components.Schemas.PointAmountTransaction;
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace UserStudentWalletsTransactions {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
            export type UserId = Components.Schemas.UUID /* uuid */;
            export type WalletId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
            walletId: Parameters.WalletId;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
        }
        namespace Responses {
            export type $200 = Components.Responses.PointWalletTransactions;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UserTeacherReports {
        namespace Parameters {
            export type DateEnd = Components.Schemas.DateTime /* date-time */;
            export type DateStart = Components.Schemas.DateTime /* date-time */;
            export type IsActive = boolean;
            export type Page = number;
            export type PageSize = number;
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            pageSize?: Parameters.PageSize;
            dateStart?: Parameters.DateStart;
            dateEnd?: Parameters.DateEnd;
            isActive?: Parameters.IsActive;
        }
        namespace Responses {
            export type $200 = Components.Responses.TeacherReports;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UserTeacherReportsExcel {
        namespace Parameters {
            export type DateEnd = Components.Schemas.DateTime /* date-time */;
            export type DateStart = Components.Schemas.DateTime /* date-time */;
            export type IsActive = boolean;
            export type UserId = Components.Schemas.UUID /* uuid */;
            export type UtcOffset = Components.Schemas.UTCOffset;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export interface QueryParameters {
            dateStart?: Parameters.DateStart;
            dateEnd?: Parameters.DateEnd;
            isActive?: Parameters.IsActive;
            utcOffset?: Parameters.UtcOffset;
        }
        namespace Responses {
            export type $200 = Components.Responses.ExcelId;
            export type Default = Components.Responses.Error;
        }
    }
    namespace UserTeacherReportsGetExcel {
        namespace Parameters {
            export type ExcelFileId = string;
            export type UserId = Components.Schemas.UUID /* uuid */;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
            excelFileId: Parameters.ExcelFileId;
        }
        namespace Responses {
            export type Default = Components.Responses.Error;
        }
    }
}


export interface OperationMethods {
  /**
   * getAbsenceReasons
   */
  'getAbsenceReasons'(
    parameters?: Parameters<Paths.GetAbsenceReasons.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAbsenceReasons.Responses.$200 | Paths.GetAbsenceReasons.Responses.Default>
  /**
   * createAbsenceReason
   */
  'createAbsenceReason'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAbsenceReason.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAbsenceReason.Responses.$200 | Paths.CreateAbsenceReason.Responses.Default>
  /**
   * getAbsenceReason
   */
  'getAbsenceReason'(
    parameters?: Parameters<Paths.GetAbsenceReason.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAbsenceReason.Responses.$200 | Paths.GetAbsenceReason.Responses.Default>
  /**
   * updateAbsenceReason
   */
  'updateAbsenceReason'(
    parameters?: Parameters<Paths.UpdateAbsenceReason.PathParameters> | null,
    data?: Paths.UpdateAbsenceReason.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAbsenceReason.Responses.$200 | Paths.UpdateAbsenceReason.Responses.Default>
  /**
   * deleteAbsenceReason
   */
  'deleteAbsenceReason'(
    parameters?: Parameters<Paths.DeleteAbsenceReason.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAbsenceReason.Responses.$204 | Paths.DeleteAbsenceReason.Responses.Default>
  /**
   * createApplication
   */
  'createApplication'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateApplication.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateApplication.Responses.$204 | Paths.CreateApplication.Responses.Default>
  /**
   * getAssignmentSubmissions
   */
  'getAssignmentSubmissions'(
    parameters?: Parameters<Paths.GetAssignmentSubmissions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAssignmentSubmissions.Responses.$200 | Paths.GetAssignmentSubmissions.Responses.Default>
  /**
   * createAssignmentSubmission
   */
  'createAssignmentSubmission'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAssignmentSubmission.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAssignmentSubmission.Responses.$200 | Paths.CreateAssignmentSubmission.Responses.Default>
  /**
   * getAssignmentSubmission
   */
  'getAssignmentSubmission'(
    parameters?: Parameters<Paths.GetAssignmentSubmission.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAssignmentSubmission.Responses.$200 | Paths.GetAssignmentSubmission.Responses.Default>
  /**
   * updateAssignmentSubmission
   */
  'updateAssignmentSubmission'(
    parameters?: Parameters<Paths.UpdateAssignmentSubmission.PathParameters> | null,
    data?: Paths.UpdateAssignmentSubmission.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAssignmentSubmission.Responses.$200 | Paths.UpdateAssignmentSubmission.Responses.Default>
  /**
   * deleteAssignmentSubmission
   */
  'deleteAssignmentSubmission'(
    parameters?: Parameters<Paths.DeleteAssignmentSubmission.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAssignmentSubmission.Responses.$204 | Paths.DeleteAssignmentSubmission.Responses.Default>
  /**
   * getAssignmentSubmissionMaterials
   */
  'getAssignmentSubmissionMaterials'(
    parameters?: Parameters<Paths.GetAssignmentSubmissionMaterials.QueryParameters & Paths.GetAssignmentSubmissionMaterials.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAssignmentSubmissionMaterials.Responses.$200 | Paths.GetAssignmentSubmissionMaterials.Responses.Default>
  /**
   * createAssignmentSubmissionMaterial
   */
  'createAssignmentSubmissionMaterial'(
    parameters?: Parameters<Paths.CreateAssignmentSubmissionMaterial.PathParameters> | null,
    data?: Paths.CreateAssignmentSubmissionMaterial.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAssignmentSubmissionMaterial.Responses.$200 | Paths.CreateAssignmentSubmissionMaterial.Responses.Default>
  /**
   * changeAssignmentSubmissionMaterialsOrder
   */
  'changeAssignmentSubmissionMaterialsOrder'(
    parameters?: Parameters<Paths.ChangeAssignmentSubmissionMaterialsOrder.PathParameters> | null,
    data?: Paths.ChangeAssignmentSubmissionMaterialsOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeAssignmentSubmissionMaterialsOrder.Responses.$204 | Paths.ChangeAssignmentSubmissionMaterialsOrder.Responses.Default>
  /**
   * getAssignmentSubmissionMaterial
   */
  'getAssignmentSubmissionMaterial'(
    parameters?: Parameters<Paths.GetAssignmentSubmissionMaterial.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAssignmentSubmissionMaterial.Responses.$200 | Paths.GetAssignmentSubmissionMaterial.Responses.Default>
  /**
   * deleteAssignmentSubmissionMaterial
   */
  'deleteAssignmentSubmissionMaterial'(
    parameters?: Parameters<Paths.DeleteAssignmentSubmissionMaterial.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAssignmentSubmissionMaterial.Responses.$204 | Paths.DeleteAssignmentSubmissionMaterial.Responses.Default>
  /**
   * getAssignments
   */
  'getAssignments'(
    parameters?: Parameters<Paths.GetAssignments.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAssignments.Responses.$200 | Paths.GetAssignments.Responses.Default>
  /**
   * createAssignment
   */
  'createAssignment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAssignment.Responses.$200 | Paths.CreateAssignment.Responses.Default>
  /**
   * getAssignment
   */
  'getAssignment'(
    parameters?: Parameters<Paths.GetAssignment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAssignment.Responses.$200 | Paths.GetAssignment.Responses.Default>
  /**
   * updateAssignment
   */
  'updateAssignment'(
    parameters?: Parameters<Paths.UpdateAssignment.PathParameters> | null,
    data?: Paths.UpdateAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAssignment.Responses.$200 | Paths.UpdateAssignment.Responses.Default>
  /**
   * deleteAssignment
   */
  'deleteAssignment'(
    parameters?: Parameters<Paths.DeleteAssignment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAssignment.Responses.$204 | Paths.DeleteAssignment.Responses.Default>
  /**
   * changeAssignmentStudyMaterialsOrder
   */
  'changeAssignmentStudyMaterialsOrder'(
    parameters?: Parameters<Paths.ChangeAssignmentStudyMaterialsOrder.PathParameters> | null,
    data?: Paths.ChangeAssignmentStudyMaterialsOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeAssignmentStudyMaterialsOrder.Responses.$204 | Paths.ChangeAssignmentStudyMaterialsOrder.Responses.Default>
  /**
   * getAttendanceRecords
   */
  'getAttendanceRecords'(
    parameters?: Parameters<Paths.GetAttendanceRecords.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAttendanceRecords.Responses.$200 | Paths.GetAttendanceRecords.Responses.Default>
  /**
   * login
   */
  'login'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Login.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Login.Responses.$200 | Paths.Login.Responses.Default>
  /**
   * logout
   */
  'logout'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Logout.Responses.$204 | Paths.Logout.Responses.Default>
  /**
   * refresh
   */
  'refresh'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Refresh.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Refresh.Responses.$200 | Paths.Refresh.Responses.Default>
  /**
   * getBranches
   */
  'getBranches'(
    parameters?: Parameters<Paths.GetBranches.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBranches.Responses.$200 | Paths.GetBranches.Responses.Default>
  /**
   * createBranch
   */
  'createBranch'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBranch.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBranch.Responses.$200 | Paths.CreateBranch.Responses.Default>
  /**
   * getBranch
   */
  'getBranch'(
    parameters?: Parameters<Paths.GetBranch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBranch.Responses.$200 | Paths.GetBranch.Responses.Default>
  /**
   * updateBranch
   */
  'updateBranch'(
    parameters?: Parameters<Paths.UpdateBranch.PathParameters> | null,
    data?: Paths.UpdateBranch.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBranch.Responses.$200 | Paths.UpdateBranch.Responses.Default>
  /**
   * deleteBranch
   */
  'deleteBranch'(
    parameters?: Parameters<Paths.DeleteBranch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBranch.Responses.$204 | Paths.DeleteBranch.Responses.Default>
  /**
   * addManagerToBranch
   */
  'addManagerToBranch'(
    parameters?: Parameters<Paths.AddManagerToBranch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddManagerToBranch.Responses.$204 | Paths.AddManagerToBranch.Responses.Default>
  /**
   * removeManagerFromBranch
   */
  'removeManagerFromBranch'(
    parameters?: Parameters<Paths.RemoveManagerFromBranch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveManagerFromBranch.Responses.$204 | Paths.RemoveManagerFromBranch.Responses.Default>
  /**
   * getClientFields
   */
  'getClientFields'(
    parameters?: Parameters<Paths.GetClientFields.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClientFields.Responses.$200 | Paths.GetClientFields.Responses.Default>
  /**
   * createClientField
   */
  'createClientField'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateClientField.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateClientField.Responses.$200 | Paths.CreateClientField.Responses.Default>
  /**
   * getClientField
   */
  'getClientField'(
    parameters?: Parameters<Paths.GetClientField.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClientField.Responses.$200 | Paths.GetClientField.Responses.Default>
  /**
   * updateClientField
   */
  'updateClientField'(
    parameters?: Parameters<Paths.UpdateClientField.PathParameters> | null,
    data?: Paths.UpdateClientField.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClientField.Responses.$200 | Paths.UpdateClientField.Responses.Default>
  /**
   * deleteClientField
   */
  'deleteClientField'(
    parameters?: Parameters<Paths.DeleteClientField.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteClientField.Responses.$204 | Paths.DeleteClientField.Responses.Default>
  /**
   * getClients
   */
  'getClients'(
    parameters?: Parameters<Paths.GetClients.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClients.Responses.$200 | Paths.GetClients.Responses.Default>
  /**
   * createClient
   */
  'createClient'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateClient.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateClient.Responses.$200 | Paths.CreateClient.Responses.Default>
  /**
   * getClient
   */
  'getClient'(
    parameters?: Parameters<Paths.GetClient.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClient.Responses.$200 | Paths.GetClient.Responses.Default>
  /**
   * updateClient
   */
  'updateClient'(
    parameters?: Parameters<Paths.UpdateClient.PathParameters> | null,
    data?: Paths.UpdateClient.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClient.Responses.$200 | Paths.UpdateClient.Responses.Default>
  /**
   * deleteClient
   */
  'deleteClient'(
    parameters?: Parameters<Paths.DeleteClient.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteClient.Responses.$204 | Paths.DeleteClient.Responses.Default>
  /**
   * getCourses
   */
  'getCourses'(
    parameters?: Parameters<Paths.GetCourses.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCourses.Responses.$200 | Paths.GetCourses.Responses.Default>
  /**
   * createCourse
   */
  'createCourse'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateCourse.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateCourse.Responses.$200 | Paths.CreateCourse.Responses.Default>
  /**
   * getCourse
   */
  'getCourse'(
    parameters?: Parameters<Paths.GetCourse.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCourse.Responses.$200 | Paths.GetCourse.Responses.Default>
  /**
   * updateCourse
   */
  'updateCourse'(
    parameters?: Parameters<Paths.UpdateCourse.PathParameters> | null,
    data?: Paths.UpdateCourse.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateCourse.Responses.$200 | Paths.UpdateCourse.Responses.Default>
  /**
   * deleteCourse
   */
  'deleteCourse'(
    parameters?: Parameters<Paths.DeleteCourse.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteCourse.Responses.$204 | Paths.DeleteCourse.Responses.Default>
  /**
   * changeLessonsOrder
   */
  'changeLessonsOrder'(
    parameters?: Parameters<Paths.ChangeLessonsOrder.PathParameters> | null,
    data?: Paths.ChangeLessonsOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeLessonsOrder.Responses.$204 | Paths.ChangeLessonsOrder.Responses.Default>
  /**
   * getGroupCourses
   */
  'getGroupCourses'(
    parameters?: Parameters<Paths.GetGroupCourses.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroupCourses.Responses.$200 | Paths.GetGroupCourses.Responses.Default>
  /**
   * createGroupCourse
   */
  'createGroupCourse'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateGroupCourse.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateGroupCourse.Responses.$200 | Paths.CreateGroupCourse.Responses.Default>
  /**
   * getGroupCourse
   */
  'getGroupCourse'(
    parameters?: Parameters<Paths.GetGroupCourse.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroupCourse.Responses.$200 | Paths.GetGroupCourse.Responses.Default>
  /**
   * updateGroupCourse
   */
  'updateGroupCourse'(
    parameters?: Parameters<Paths.UpdateGroupCourse.PathParameters> | null,
    data?: Paths.UpdateGroupCourse.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateGroupCourse.Responses.$200 | Paths.UpdateGroupCourse.Responses.Default>
  /**
   * deleteGroupCourse
   */
  'deleteGroupCourse'(
    parameters?: Parameters<Paths.DeleteGroupCourse.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteGroupCourse.Responses.$204 | Paths.DeleteGroupCourse.Responses.Default>
  /**
   * completeGroupCourse
   */
  'completeGroupCourse'(
    parameters?: Parameters<Paths.CompleteGroupCourse.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompleteGroupCourse.Responses.$200 | Paths.CompleteGroupCourse.Responses.Default>
  /**
   * getGroupCourseDiff - Get differences between group course and the template
   */
  'getGroupCourseDiff'(
    parameters?: Parameters<Paths.GetGroupCourseDiff.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroupCourseDiff.Responses.$200 | Paths.GetGroupCourseDiff.Responses.Default>
  /**
   * syncGroupCourse - Synchronize group course with the current course template updates
   */
  'syncGroupCourse'(
    parameters?: Parameters<Paths.SyncGroupCourse.PathParameters> | null,
    data?: Paths.SyncGroupCourse.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SyncGroupCourse.Responses.$200 | Paths.SyncGroupCourse.Responses.Default>
  /**
   * getGroups
   */
  'getGroups'(
    parameters?: Parameters<Paths.GetGroups.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroups.Responses.$200 | Paths.GetGroups.Responses.Default>
  /**
   * createGroup
   */
  'createGroup'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateGroup.Responses.$200 | Paths.CreateGroup.Responses.Default>
  /**
   * getGroup
   */
  'getGroup'(
    parameters?: Parameters<Paths.GetGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroup.Responses.$200 | Paths.GetGroup.Responses.Default>
  /**
   * updateGroup
   */
  'updateGroup'(
    parameters?: Parameters<Paths.UpdateGroup.PathParameters> | null,
    data?: Paths.UpdateGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateGroup.Responses.$200 | Paths.UpdateGroup.Responses.Default>
  /**
   * deleteGroup
   */
  'deleteGroup'(
    parameters?: Parameters<Paths.DeleteGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteGroup.Responses.$204 | Paths.DeleteGroup.Responses.Default>
  /**
   * addStudentToGroup
   */
  'addStudentToGroup'(
    parameters?: Parameters<Paths.AddStudentToGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStudentToGroup.Responses.$204 | Paths.AddStudentToGroup.Responses.Default>
  /**
   * removeStudentFromGroup
   */
  'removeStudentFromGroup'(
    parameters?: Parameters<Paths.RemoveStudentFromGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveStudentFromGroup.Responses.$204 | Paths.RemoveStudentFromGroup.Responses.Default>
  /**
   * getHealth - Health Check
   * 
   * Returns the health status of the service
   */
  'getHealth'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetHealth.Responses.$200 | Paths.GetHealth.Responses.Default>
  /**
   * getLessonSubscriptions
   */
  'getLessonSubscriptions'(
    parameters?: Parameters<Paths.GetLessonSubscriptions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLessonSubscriptions.Responses.$200 | Paths.GetLessonSubscriptions.Responses.Default>
  /**
   * createLessonSubscription
   */
  'createLessonSubscription'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateLessonSubscription.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateLessonSubscription.Responses.$200 | Paths.CreateLessonSubscription.Responses.Default>
  /**
   * getLessonSubscription
   */
  'getLessonSubscription'(
    parameters?: Parameters<Paths.GetLessonSubscription.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLessonSubscription.Responses.$200 | Paths.GetLessonSubscription.Responses.Default>
  /**
   * closeLessonSubscription
   */
  'closeLessonSubscription'(
    parameters?: Parameters<Paths.CloseLessonSubscription.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CloseLessonSubscription.Responses.$200 | Paths.CloseLessonSubscription.Responses.Default>
  /**
   * getLessons
   */
  'getLessons'(
    parameters?: Parameters<Paths.GetLessons.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLessons.Responses.$200 | Paths.GetLessons.Responses.Default>
  /**
   * createLesson
   */
  'createLesson'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateLesson.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateLesson.Responses.$200 | Paths.CreateLesson.Responses.Default>
  /**
   * getLesson
   */
  'getLesson'(
    parameters?: Parameters<Paths.GetLesson.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLesson.Responses.$200 | Paths.GetLesson.Responses.Default>
  /**
   * updateLesson
   */
  'updateLesson'(
    parameters?: Parameters<Paths.UpdateLesson.PathParameters> | null,
    data?: Paths.UpdateLesson.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateLesson.Responses.$200 | Paths.UpdateLesson.Responses.Default>
  /**
   * deleteLesson
   */
  'deleteLesson'(
    parameters?: Parameters<Paths.DeleteLesson.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteLesson.Responses.$204 | Paths.DeleteLesson.Responses.Default>
  /**
   * changeAssignmentsOrder
   */
  'changeAssignmentsOrder'(
    parameters?: Parameters<Paths.ChangeAssignmentsOrder.PathParameters> | null,
    data?: Paths.ChangeAssignmentsOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeAssignmentsOrder.Responses.$204 | Paths.ChangeAssignmentsOrder.Responses.Default>
  /**
   * changeLessonStudyMaterialsOrder
   */
  'changeLessonStudyMaterialsOrder'(
    parameters?: Parameters<Paths.ChangeLessonStudyMaterialsOrder.PathParameters> | null,
    data?: Paths.ChangeLessonStudyMaterialsOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeLessonStudyMaterialsOrder.Responses.$204 | Paths.ChangeLessonStudyMaterialsOrder.Responses.Default>
  /**
   * getManagerStudentGroupSubscriptions
   */
  'getManagerStudentGroupSubscriptions'(
    parameters?: Parameters<Paths.GetManagerStudentGroupSubscriptions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetManagerStudentGroupSubscriptions.Responses.$200 | Paths.GetManagerStudentGroupSubscriptions.Responses.Default>
  /**
   * getNotifications
   */
  'getNotifications'(
    parameters?: Parameters<Paths.GetNotifications.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNotifications.Responses.$200 | Paths.GetNotifications.Responses.Default>
  /**
   * deleteNotification
   */
  'deleteNotification'(
    parameters?: Parameters<Paths.DeleteNotification.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteNotification.Responses.$204 | Paths.DeleteNotification.Responses.Default>
  /**
   * readNotification
   */
  'readNotification'(
    parameters?: Parameters<Paths.ReadNotification.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadNotification.Responses.$204 | Paths.ReadNotification.Responses.Default>
  /**
   * getOpenAPIJSON
   */
  'getOpenAPIJSON'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOpenAPIJSON.Responses.$200 | Paths.GetOpenAPIJSON.Responses.Default>
  /**
   * getOpenAPIYAML
   */
  'getOpenAPIYAML'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOpenAPIYAML.Responses.Default>
  /**
   * getPointTypes
   */
  'getPointTypes'(
    parameters?: Parameters<Paths.GetPointTypes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPointTypes.Responses.$200 | Paths.GetPointTypes.Responses.Default>
  /**
   * createPointType
   */
  'createPointType'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePointType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePointType.Responses.$200 | Paths.CreatePointType.Responses.Default>
  /**
   * getPointType
   */
  'getPointType'(
    parameters?: Parameters<Paths.GetPointType.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPointType.Responses.$200 | Paths.GetPointType.Responses.Default>
  /**
   * updatePointType
   */
  'updatePointType'(
    parameters?: Parameters<Paths.UpdatePointType.PathParameters> | null,
    data?: Paths.UpdatePointType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdatePointType.Responses.$200 | Paths.UpdatePointType.Responses.Default>
  /**
   * deletePointType
   */
  'deletePointType'(
    parameters?: Parameters<Paths.DeletePointType.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePointType.Responses.$204 | Paths.DeletePointType.Responses.Default>
  /**
   * getScheduledAssignments
   */
  'getScheduledAssignments'(
    parameters?: Parameters<Paths.GetScheduledAssignments.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetScheduledAssignments.Responses.$200 | Paths.GetScheduledAssignments.Responses.Default>
  /**
   * createScheduledAssignment
   */
  'createScheduledAssignment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateScheduledAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateScheduledAssignment.Responses.$200 | Paths.CreateScheduledAssignment.Responses.Default>
  /**
   * getScheduledAssignment
   */
  'getScheduledAssignment'(
    parameters?: Parameters<Paths.GetScheduledAssignment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetScheduledAssignment.Responses.$200 | Paths.GetScheduledAssignment.Responses.Default>
  /**
   * updateScheduledAssignment
   */
  'updateScheduledAssignment'(
    parameters?: Parameters<Paths.UpdateScheduledAssignment.PathParameters> | null,
    data?: Paths.UpdateScheduledAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateScheduledAssignment.Responses.$200 | Paths.UpdateScheduledAssignment.Responses.Default>
  /**
   * deleteScheduledAssignment
   */
  'deleteScheduledAssignment'(
    parameters?: Parameters<Paths.DeleteScheduledAssignment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteScheduledAssignment.Responses.$204 | Paths.DeleteScheduledAssignment.Responses.Default>
  /**
   * evaluateStudentAssignment - Evaluate a student’s points for a scheduled assignment
   */
  'evaluateStudentAssignment'(
    parameters?: Parameters<Paths.EvaluateStudentAssignment.PathParameters> | null,
    data?: Paths.EvaluateStudentAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EvaluateStudentAssignment.Responses.$200 | Paths.EvaluateStudentAssignment.Responses.$201 | Paths.EvaluateStudentAssignment.Responses.Default>
  /**
   * getScheduledLessons
   */
  'getScheduledLessons'(
    parameters?: Parameters<Paths.GetScheduledLessons.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetScheduledLessons.Responses.$200 | Paths.GetScheduledLessons.Responses.Default>
  /**
   * createScheduledLesson
   */
  'createScheduledLesson'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateScheduledLesson.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateScheduledLesson.Responses.$200 | Paths.CreateScheduledLesson.Responses.Default>
  /**
   * getScheduledLesson
   */
  'getScheduledLesson'(
    parameters?: Parameters<Paths.GetScheduledLesson.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetScheduledLesson.Responses.$200 | Paths.GetScheduledLesson.Responses.Default>
  /**
   * updateScheduledLesson
   */
  'updateScheduledLesson'(
    parameters?: Parameters<Paths.UpdateScheduledLesson.PathParameters> | null,
    data?: Paths.UpdateScheduledLesson.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateScheduledLesson.Responses.$200 | Paths.UpdateScheduledLesson.Responses.Default>
  /**
   * deleteScheduledLesson
   */
  'deleteScheduledLesson'(
    parameters?: Parameters<Paths.DeleteScheduledLesson.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteScheduledLesson.Responses.$204 | Paths.DeleteScheduledLesson.Responses.Default>
  /**
   * setScheduledLessonAttendanceRecords
   */
  'setScheduledLessonAttendanceRecords'(
    parameters?: Parameters<Paths.SetScheduledLessonAttendanceRecords.PathParameters> | null,
    data?: Paths.SetScheduledLessonAttendanceRecords.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetScheduledLessonAttendanceRecords.Responses.$200 | Paths.SetScheduledLessonAttendanceRecords.Responses.Default>
  /**
   * scheduledLessonShift
   */
  'scheduledLessonShift'(
    parameters?: Parameters<Paths.ScheduledLessonShift.PathParameters> | null,
    data?: Paths.ScheduledLessonShift.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ScheduledLessonShift.Responses.$200 | Paths.ScheduledLessonShift.Responses.Default>
  /**
   * getStudentSchedule
   */
  'getStudentSchedule'(
    parameters?: Parameters<Paths.GetStudentSchedule.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStudentSchedule.Responses.$200 | Paths.GetStudentSchedule.Responses.Default>
  /**
   * getSchools
   */
  'getSchools'(
    parameters?: Parameters<Paths.GetSchools.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchools.Responses.$200 | Paths.GetSchools.Responses.Default>
  /**
   * createSchool
   */
  'createSchool'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSchool.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSchool.Responses.$200 | Paths.CreateSchool.Responses.Default>
  /**
   * getSchool
   */
  'getSchool'(
    parameters?: Parameters<Paths.GetSchool.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchool.Responses.$200 | Paths.GetSchool.Responses.Default>
  /**
   * updateSchool
   */
  'updateSchool'(
    parameters?: Parameters<Paths.UpdateSchool.PathParameters> | null,
    data?: Paths.UpdateSchool.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSchool.Responses.$200 | Paths.UpdateSchool.Responses.Default>
  /**
   * deleteSchool
   */
  'deleteSchool'(
    parameters?: Parameters<Paths.DeleteSchool.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSchool.Responses.$204 | Paths.DeleteSchool.Responses.Default>
  /**
   * changeClientFieldsOrder
   */
  'changeClientFieldsOrder'(
    parameters?: Parameters<Paths.ChangeClientFieldsOrder.PathParameters> | null,
    data?: Paths.ChangeClientFieldsOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeClientFieldsOrder.Responses.$204 | Paths.ChangeClientFieldsOrder.Responses.Default>
  /**
   * getSchoolUsernames - Returns a free username for the specified school
   */
  'getSchoolUsernames'(
    parameters?: Parameters<Paths.GetSchoolUsernames.QueryParameters & Paths.GetSchoolUsernames.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchoolUsernames.Responses.$200 | Paths.GetSchoolUsernames.Responses.Default>
  /**
   * getStudyMaterials
   */
  'getStudyMaterials'(
    parameters?: Parameters<Paths.GetStudyMaterials.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStudyMaterials.Responses.$200 | Paths.GetStudyMaterials.Responses.Default>
  /**
   * createStudyMaterial
   */
  'createStudyMaterial'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateStudyMaterial.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateStudyMaterial.Responses.$200 | Paths.CreateStudyMaterial.Responses.Default>
  /**
   * getStudyMaterial
   */
  'getStudyMaterial'(
    parameters?: Parameters<Paths.GetStudyMaterial.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStudyMaterial.Responses.$200 | Paths.GetStudyMaterial.Responses.Default>
  /**
   * updateStudyMaterial
   */
  'updateStudyMaterial'(
    parameters?: Parameters<Paths.UpdateStudyMaterial.PathParameters> | null,
    data?: Paths.UpdateStudyMaterial.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateStudyMaterial.Responses.$200 | Paths.UpdateStudyMaterial.Responses.Default>
  /**
   * deleteStudyMaterial
   */
  'deleteStudyMaterial'(
    parameters?: Parameters<Paths.DeleteStudyMaterial.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteStudyMaterial.Responses.$204 | Paths.DeleteStudyMaterial.Responses.Default>
  /**
   * getUsers
   */
  'getUsers'(
    parameters?: Parameters<Paths.GetUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUsers.Responses.$200 | Paths.GetUsers.Responses.Default>
  /**
   * createUser
   */
  'createUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUser.Responses.$200 | Paths.CreateUser.Responses.Default>
  /**
   * getUser
   */
  'getUser'(
    parameters?: Parameters<Paths.GetUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUser.Responses.$200 | Paths.GetUser.Responses.Default>
  /**
   * updateUser
   */
  'updateUser'(
    parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
    data?: Paths.UpdateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUser.Responses.$200 | Paths.UpdateUser.Responses.Default>
  /**
   * deleteUser
   */
  'deleteUser'(
    parameters?: Parameters<Paths.DeleteUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUser.Responses.$204 | Paths.DeleteUser.Responses.Default>
  /**
   * updateUserAvatar - Returns PUT link to upload a new avatar
   */
  'updateUserAvatar'(
    parameters?: Parameters<Paths.UpdateUserAvatar.PathParameters> | null,
    data?: Paths.UpdateUserAvatar.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserAvatar.Responses.$200 | Paths.UpdateUserAvatar.Responses.Default>
  /**
   * deleteUserAvatar
   */
  'deleteUserAvatar'(
    parameters?: Parameters<Paths.DeleteUserAvatar.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUserAvatar.Responses.$204 | Paths.DeleteUserAvatar.Responses.Default>
  /**
   * getUserStudent
   */
  'getUserStudent'(
    parameters?: Parameters<Paths.GetUserStudent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserStudent.Responses.$200 | Paths.GetUserStudent.Responses.Default>
  /**
   * changeStudentPassword
   */
  'changeStudentPassword'(
    parameters?: Parameters<Paths.ChangeStudentPassword.PathParameters> | null,
    data?: Paths.ChangeStudentPassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeStudentPassword.Responses.$204 | Paths.ChangeStudentPassword.Responses.Default>
  /**
   * userStudentWalletsManualCredit
   */
  'userStudentWalletsManualCredit'(
    parameters?: Parameters<Paths.UserStudentWalletsManualCredit.PathParameters> | null,
    data?: Paths.UserStudentWalletsManualCredit.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserStudentWalletsManualCredit.Responses.$204 | Paths.UserStudentWalletsManualCredit.Responses.Default>
  /**
   * userStudentWalletsManualDebit
   */
  'userStudentWalletsManualDebit'(
    parameters?: Parameters<Paths.UserStudentWalletsManualDebit.PathParameters> | null,
    data?: Paths.UserStudentWalletsManualDebit.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserStudentWalletsManualDebit.Responses.$204 | Paths.UserStudentWalletsManualDebit.Responses.Default>
  /**
   * userStudentWalletsTransactions
   */
  'userStudentWalletsTransactions'(
    parameters?: Parameters<Paths.UserStudentWalletsTransactions.QueryParameters & Paths.UserStudentWalletsTransactions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserStudentWalletsTransactions.Responses.$200 | Paths.UserStudentWalletsTransactions.Responses.Default>
  /**
   * userTeacherReports
   */
  'userTeacherReports'(
    parameters?: Parameters<Paths.UserTeacherReports.QueryParameters & Paths.UserTeacherReports.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserTeacherReports.Responses.$200 | Paths.UserTeacherReports.Responses.Default>
  /**
   * userTeacherReportsExcel
   */
  'userTeacherReportsExcel'(
    parameters?: Parameters<Paths.UserTeacherReportsExcel.QueryParameters & Paths.UserTeacherReportsExcel.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserTeacherReportsExcel.Responses.$200 | Paths.UserTeacherReportsExcel.Responses.Default>
  /**
   * userTeacherReportsGetExcel
   */
  'userTeacherReportsGetExcel'(
    parameters?: Parameters<Paths.UserTeacherReportsGetExcel.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserTeacherReportsGetExcel.Responses.Default>
  /**
   * changePassword
   */
  'changePassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ChangePassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangePassword.Responses.$204 | Paths.ChangePassword.Responses.Default>
  /**
   * recoveryPassword
   */
  'recoveryPassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RecoveryPassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RecoveryPassword.Responses.$204 | Paths.RecoveryPassword.Responses.Default>
  /**
   * recoveryPasswordSendLink
   */
  'recoveryPasswordSendLink'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RecoveryPasswordSendLink.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RecoveryPasswordSendLink.Responses.$204 | Paths.RecoveryPasswordSendLink.Responses.Default>
  /**
   * register
   */
  'register'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Register.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Register.Responses.$204 | Paths.Register.Responses.Default>
  /**
   * registerConfirmEmail
   */
  'registerConfirmEmail'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RegisterConfirmEmail.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegisterConfirmEmail.Responses.$200 | Paths.RegisterConfirmEmail.Responses.Default>
  /**
   * registerSendCode
   */
  'registerSendCode'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RegisterSendCode.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegisterSendCode.Responses.$204 | Paths.RegisterSendCode.Responses.Default>
}

export interface PathsDictionary {
  ['/absence-reasons']: {
    /**
     * getAbsenceReasons
     */
    'get'(
      parameters?: Parameters<Paths.GetAbsenceReasons.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAbsenceReasons.Responses.$200 | Paths.GetAbsenceReasons.Responses.Default>
    /**
     * createAbsenceReason
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAbsenceReason.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAbsenceReason.Responses.$200 | Paths.CreateAbsenceReason.Responses.Default>
  }
  ['/absence-reasons/{absenceReasonId}']: {
    /**
     * deleteAbsenceReason
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteAbsenceReason.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAbsenceReason.Responses.$204 | Paths.DeleteAbsenceReason.Responses.Default>
    /**
     * getAbsenceReason
     */
    'get'(
      parameters?: Parameters<Paths.GetAbsenceReason.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAbsenceReason.Responses.$200 | Paths.GetAbsenceReason.Responses.Default>
    /**
     * updateAbsenceReason
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateAbsenceReason.PathParameters> | null,
      data?: Paths.UpdateAbsenceReason.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAbsenceReason.Responses.$200 | Paths.UpdateAbsenceReason.Responses.Default>
  }
  ['/applications']: {
    /**
     * createApplication
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateApplication.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateApplication.Responses.$204 | Paths.CreateApplication.Responses.Default>
  }
  ['/assignment-submissions']: {
    /**
     * getAssignmentSubmissions
     */
    'get'(
      parameters?: Parameters<Paths.GetAssignmentSubmissions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAssignmentSubmissions.Responses.$200 | Paths.GetAssignmentSubmissions.Responses.Default>
    /**
     * createAssignmentSubmission
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAssignmentSubmission.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAssignmentSubmission.Responses.$200 | Paths.CreateAssignmentSubmission.Responses.Default>
  }
  ['/assignment-submissions/{assignmentSubmissionId}']: {
    /**
     * deleteAssignmentSubmission
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteAssignmentSubmission.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAssignmentSubmission.Responses.$204 | Paths.DeleteAssignmentSubmission.Responses.Default>
    /**
     * getAssignmentSubmission
     */
    'get'(
      parameters?: Parameters<Paths.GetAssignmentSubmission.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAssignmentSubmission.Responses.$200 | Paths.GetAssignmentSubmission.Responses.Default>
    /**
     * updateAssignmentSubmission
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateAssignmentSubmission.PathParameters> | null,
      data?: Paths.UpdateAssignmentSubmission.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAssignmentSubmission.Responses.$200 | Paths.UpdateAssignmentSubmission.Responses.Default>
  }
  ['/assignment-submissions/{assignmentSubmissionId}/materials']: {
    /**
     * getAssignmentSubmissionMaterials
     */
    'get'(
      parameters?: Parameters<Paths.GetAssignmentSubmissionMaterials.QueryParameters & Paths.GetAssignmentSubmissionMaterials.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAssignmentSubmissionMaterials.Responses.$200 | Paths.GetAssignmentSubmissionMaterials.Responses.Default>
    /**
     * createAssignmentSubmissionMaterial
     */
    'post'(
      parameters?: Parameters<Paths.CreateAssignmentSubmissionMaterial.PathParameters> | null,
      data?: Paths.CreateAssignmentSubmissionMaterial.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAssignmentSubmissionMaterial.Responses.$200 | Paths.CreateAssignmentSubmissionMaterial.Responses.Default>
  }
  ['/assignment-submissions/{assignmentSubmissionId}/materials/change-order']: {
    /**
     * changeAssignmentSubmissionMaterialsOrder
     */
    'post'(
      parameters?: Parameters<Paths.ChangeAssignmentSubmissionMaterialsOrder.PathParameters> | null,
      data?: Paths.ChangeAssignmentSubmissionMaterialsOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeAssignmentSubmissionMaterialsOrder.Responses.$204 | Paths.ChangeAssignmentSubmissionMaterialsOrder.Responses.Default>
  }
  ['/assignment-submissions/materials/{assignmentSubmissionMaterialId}']: {
    /**
     * deleteAssignmentSubmissionMaterial
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteAssignmentSubmissionMaterial.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAssignmentSubmissionMaterial.Responses.$204 | Paths.DeleteAssignmentSubmissionMaterial.Responses.Default>
    /**
     * getAssignmentSubmissionMaterial
     */
    'get'(
      parameters?: Parameters<Paths.GetAssignmentSubmissionMaterial.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAssignmentSubmissionMaterial.Responses.$200 | Paths.GetAssignmentSubmissionMaterial.Responses.Default>
  }
  ['/assignments']: {
    /**
     * getAssignments
     */
    'get'(
      parameters?: Parameters<Paths.GetAssignments.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAssignments.Responses.$200 | Paths.GetAssignments.Responses.Default>
    /**
     * createAssignment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAssignment.Responses.$200 | Paths.CreateAssignment.Responses.Default>
  }
  ['/assignments/{assignmentId}']: {
    /**
     * deleteAssignment
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteAssignment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAssignment.Responses.$204 | Paths.DeleteAssignment.Responses.Default>
    /**
     * getAssignment
     */
    'get'(
      parameters?: Parameters<Paths.GetAssignment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAssignment.Responses.$200 | Paths.GetAssignment.Responses.Default>
    /**
     * updateAssignment
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateAssignment.PathParameters> | null,
      data?: Paths.UpdateAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAssignment.Responses.$200 | Paths.UpdateAssignment.Responses.Default>
  }
  ['/assignments/{assignmentId}/study-materials/change-order']: {
    /**
     * changeAssignmentStudyMaterialsOrder
     */
    'post'(
      parameters?: Parameters<Paths.ChangeAssignmentStudyMaterialsOrder.PathParameters> | null,
      data?: Paths.ChangeAssignmentStudyMaterialsOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeAssignmentStudyMaterialsOrder.Responses.$204 | Paths.ChangeAssignmentStudyMaterialsOrder.Responses.Default>
  }
  ['/attendance']: {
    /**
     * getAttendanceRecords
     */
    'get'(
      parameters?: Parameters<Paths.GetAttendanceRecords.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAttendanceRecords.Responses.$200 | Paths.GetAttendanceRecords.Responses.Default>
  }
  ['/auth/login']: {
    /**
     * login
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Login.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Login.Responses.$200 | Paths.Login.Responses.Default>
  }
  ['/auth/logout']: {
    /**
     * logout
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Logout.Responses.$204 | Paths.Logout.Responses.Default>
  }
  ['/auth/refresh']: {
    /**
     * refresh
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Refresh.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Refresh.Responses.$200 | Paths.Refresh.Responses.Default>
  }
  ['/branches']: {
    /**
     * getBranches
     */
    'get'(
      parameters?: Parameters<Paths.GetBranches.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBranches.Responses.$200 | Paths.GetBranches.Responses.Default>
    /**
     * createBranch
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBranch.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBranch.Responses.$200 | Paths.CreateBranch.Responses.Default>
  }
  ['/branches/{branchId}']: {
    /**
     * deleteBranch
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBranch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBranch.Responses.$204 | Paths.DeleteBranch.Responses.Default>
    /**
     * getBranch
     */
    'get'(
      parameters?: Parameters<Paths.GetBranch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBranch.Responses.$200 | Paths.GetBranch.Responses.Default>
    /**
     * updateBranch
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateBranch.PathParameters> | null,
      data?: Paths.UpdateBranch.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBranch.Responses.$200 | Paths.UpdateBranch.Responses.Default>
  }
  ['/branches/{branchId}/managers/{managerId}']: {
    /**
     * removeManagerFromBranch
     */
    'delete'(
      parameters?: Parameters<Paths.RemoveManagerFromBranch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveManagerFromBranch.Responses.$204 | Paths.RemoveManagerFromBranch.Responses.Default>
    /**
     * addManagerToBranch
     */
    'put'(
      parameters?: Parameters<Paths.AddManagerToBranch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddManagerToBranch.Responses.$204 | Paths.AddManagerToBranch.Responses.Default>
  }
  ['/client-fields']: {
    /**
     * getClientFields
     */
    'get'(
      parameters?: Parameters<Paths.GetClientFields.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClientFields.Responses.$200 | Paths.GetClientFields.Responses.Default>
    /**
     * createClientField
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateClientField.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateClientField.Responses.$200 | Paths.CreateClientField.Responses.Default>
  }
  ['/client-fields/{fieldId}']: {
    /**
     * deleteClientField
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteClientField.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteClientField.Responses.$204 | Paths.DeleteClientField.Responses.Default>
    /**
     * getClientField
     */
    'get'(
      parameters?: Parameters<Paths.GetClientField.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClientField.Responses.$200 | Paths.GetClientField.Responses.Default>
    /**
     * updateClientField
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateClientField.PathParameters> | null,
      data?: Paths.UpdateClientField.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClientField.Responses.$200 | Paths.UpdateClientField.Responses.Default>
  }
  ['/clients']: {
    /**
     * getClients
     */
    'get'(
      parameters?: Parameters<Paths.GetClients.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClients.Responses.$200 | Paths.GetClients.Responses.Default>
    /**
     * createClient
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateClient.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateClient.Responses.$200 | Paths.CreateClient.Responses.Default>
  }
  ['/clients/{clientId}']: {
    /**
     * deleteClient
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteClient.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteClient.Responses.$204 | Paths.DeleteClient.Responses.Default>
    /**
     * getClient
     */
    'get'(
      parameters?: Parameters<Paths.GetClient.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClient.Responses.$200 | Paths.GetClient.Responses.Default>
    /**
     * updateClient
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateClient.PathParameters> | null,
      data?: Paths.UpdateClient.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClient.Responses.$200 | Paths.UpdateClient.Responses.Default>
  }
  ['/courses']: {
    /**
     * getCourses
     */
    'get'(
      parameters?: Parameters<Paths.GetCourses.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCourses.Responses.$200 | Paths.GetCourses.Responses.Default>
    /**
     * createCourse
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateCourse.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateCourse.Responses.$200 | Paths.CreateCourse.Responses.Default>
  }
  ['/courses/{courseId}']: {
    /**
     * deleteCourse
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteCourse.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteCourse.Responses.$204 | Paths.DeleteCourse.Responses.Default>
    /**
     * getCourse
     */
    'get'(
      parameters?: Parameters<Paths.GetCourse.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCourse.Responses.$200 | Paths.GetCourse.Responses.Default>
    /**
     * updateCourse
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateCourse.PathParameters> | null,
      data?: Paths.UpdateCourse.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateCourse.Responses.$200 | Paths.UpdateCourse.Responses.Default>
  }
  ['/courses/{courseId}/lessons/change-order']: {
    /**
     * changeLessonsOrder
     */
    'post'(
      parameters?: Parameters<Paths.ChangeLessonsOrder.PathParameters> | null,
      data?: Paths.ChangeLessonsOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeLessonsOrder.Responses.$204 | Paths.ChangeLessonsOrder.Responses.Default>
  }
  ['/group-courses']: {
    /**
     * getGroupCourses
     */
    'get'(
      parameters?: Parameters<Paths.GetGroupCourses.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroupCourses.Responses.$200 | Paths.GetGroupCourses.Responses.Default>
    /**
     * createGroupCourse
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateGroupCourse.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateGroupCourse.Responses.$200 | Paths.CreateGroupCourse.Responses.Default>
  }
  ['/group-courses/{groupCourseId}']: {
    /**
     * deleteGroupCourse
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteGroupCourse.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteGroupCourse.Responses.$204 | Paths.DeleteGroupCourse.Responses.Default>
    /**
     * getGroupCourse
     */
    'get'(
      parameters?: Parameters<Paths.GetGroupCourse.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroupCourse.Responses.$200 | Paths.GetGroupCourse.Responses.Default>
    /**
     * updateGroupCourse
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateGroupCourse.PathParameters> | null,
      data?: Paths.UpdateGroupCourse.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateGroupCourse.Responses.$200 | Paths.UpdateGroupCourse.Responses.Default>
  }
  ['/group-courses/{groupCourseId}/complete']: {
    /**
     * completeGroupCourse
     */
    'post'(
      parameters?: Parameters<Paths.CompleteGroupCourse.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompleteGroupCourse.Responses.$200 | Paths.CompleteGroupCourse.Responses.Default>
  }
  ['/group-courses/{groupCourseId}/diff']: {
    /**
     * getGroupCourseDiff - Get differences between group course and the template
     */
    'get'(
      parameters?: Parameters<Paths.GetGroupCourseDiff.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroupCourseDiff.Responses.$200 | Paths.GetGroupCourseDiff.Responses.Default>
    /**
     * syncGroupCourse - Synchronize group course with the current course template updates
     */
    'post'(
      parameters?: Parameters<Paths.SyncGroupCourse.PathParameters> | null,
      data?: Paths.SyncGroupCourse.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SyncGroupCourse.Responses.$200 | Paths.SyncGroupCourse.Responses.Default>
  }
  ['/groups']: {
    /**
     * getGroups
     */
    'get'(
      parameters?: Parameters<Paths.GetGroups.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroups.Responses.$200 | Paths.GetGroups.Responses.Default>
    /**
     * createGroup
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateGroup.Responses.$200 | Paths.CreateGroup.Responses.Default>
  }
  ['/groups/{groupId}']: {
    /**
     * deleteGroup
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteGroup.Responses.$204 | Paths.DeleteGroup.Responses.Default>
    /**
     * getGroup
     */
    'get'(
      parameters?: Parameters<Paths.GetGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroup.Responses.$200 | Paths.GetGroup.Responses.Default>
    /**
     * updateGroup
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateGroup.PathParameters> | null,
      data?: Paths.UpdateGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateGroup.Responses.$200 | Paths.UpdateGroup.Responses.Default>
  }
  ['/groups/{groupId}/students/{studentId}']: {
    /**
     * removeStudentFromGroup
     */
    'delete'(
      parameters?: Parameters<Paths.RemoveStudentFromGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveStudentFromGroup.Responses.$204 | Paths.RemoveStudentFromGroup.Responses.Default>
    /**
     * addStudentToGroup
     */
    'put'(
      parameters?: Parameters<Paths.AddStudentToGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStudentToGroup.Responses.$204 | Paths.AddStudentToGroup.Responses.Default>
  }
  ['/health']: {
    /**
     * getHealth - Health Check
     * 
     * Returns the health status of the service
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetHealth.Responses.$200 | Paths.GetHealth.Responses.Default>
  }
  ['/lesson-subscriptions']: {
    /**
     * getLessonSubscriptions
     */
    'get'(
      parameters?: Parameters<Paths.GetLessonSubscriptions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLessonSubscriptions.Responses.$200 | Paths.GetLessonSubscriptions.Responses.Default>
    /**
     * createLessonSubscription
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateLessonSubscription.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateLessonSubscription.Responses.$200 | Paths.CreateLessonSubscription.Responses.Default>
  }
  ['/lesson-subscriptions/{lessonSubscriptionId}']: {
    /**
     * getLessonSubscription
     */
    'get'(
      parameters?: Parameters<Paths.GetLessonSubscription.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLessonSubscription.Responses.$200 | Paths.GetLessonSubscription.Responses.Default>
  }
  ['/lesson-subscriptions/{lessonSubscriptionId}/close']: {
    /**
     * closeLessonSubscription
     */
    'post'(
      parameters?: Parameters<Paths.CloseLessonSubscription.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CloseLessonSubscription.Responses.$200 | Paths.CloseLessonSubscription.Responses.Default>
  }
  ['/lessons']: {
    /**
     * getLessons
     */
    'get'(
      parameters?: Parameters<Paths.GetLessons.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLessons.Responses.$200 | Paths.GetLessons.Responses.Default>
    /**
     * createLesson
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateLesson.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateLesson.Responses.$200 | Paths.CreateLesson.Responses.Default>
  }
  ['/lessons/{lessonId}']: {
    /**
     * deleteLesson
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteLesson.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteLesson.Responses.$204 | Paths.DeleteLesson.Responses.Default>
    /**
     * getLesson
     */
    'get'(
      parameters?: Parameters<Paths.GetLesson.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLesson.Responses.$200 | Paths.GetLesson.Responses.Default>
    /**
     * updateLesson
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateLesson.PathParameters> | null,
      data?: Paths.UpdateLesson.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateLesson.Responses.$200 | Paths.UpdateLesson.Responses.Default>
  }
  ['/lessons/{lessonId}/assignments/change-order']: {
    /**
     * changeAssignmentsOrder
     */
    'post'(
      parameters?: Parameters<Paths.ChangeAssignmentsOrder.PathParameters> | null,
      data?: Paths.ChangeAssignmentsOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeAssignmentsOrder.Responses.$204 | Paths.ChangeAssignmentsOrder.Responses.Default>
  }
  ['/lessons/{lessonId}/study-materials/change-order']: {
    /**
     * changeLessonStudyMaterialsOrder
     */
    'post'(
      parameters?: Parameters<Paths.ChangeLessonStudyMaterialsOrder.PathParameters> | null,
      data?: Paths.ChangeLessonStudyMaterialsOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeLessonStudyMaterialsOrder.Responses.$204 | Paths.ChangeLessonStudyMaterialsOrder.Responses.Default>
  }
  ['/management/student-groups-subscriptions']: {
    /**
     * getManagerStudentGroupSubscriptions
     */
    'get'(
      parameters?: Parameters<Paths.GetManagerStudentGroupSubscriptions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetManagerStudentGroupSubscriptions.Responses.$200 | Paths.GetManagerStudentGroupSubscriptions.Responses.Default>
  }
  ['/notifications']: {
    /**
     * getNotifications
     */
    'get'(
      parameters?: Parameters<Paths.GetNotifications.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNotifications.Responses.$200 | Paths.GetNotifications.Responses.Default>
  }
  ['/notifications/{notificationId}']: {
    /**
     * deleteNotification
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteNotification.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteNotification.Responses.$204 | Paths.DeleteNotification.Responses.Default>
  }
  ['/notifications/{notificationId}/read']: {
    /**
     * readNotification
     */
    'post'(
      parameters?: Parameters<Paths.ReadNotification.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadNotification.Responses.$204 | Paths.ReadNotification.Responses.Default>
  }
  ['/openapi.json']: {
    /**
     * getOpenAPIJSON
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOpenAPIJSON.Responses.$200 | Paths.GetOpenAPIJSON.Responses.Default>
  }
  ['/openapi.yaml']: {
    /**
     * getOpenAPIYAML
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOpenAPIYAML.Responses.Default>
  }
  ['/pointTypes']: {
    /**
     * getPointTypes
     */
    'get'(
      parameters?: Parameters<Paths.GetPointTypes.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPointTypes.Responses.$200 | Paths.GetPointTypes.Responses.Default>
    /**
     * createPointType
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePointType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePointType.Responses.$200 | Paths.CreatePointType.Responses.Default>
  }
  ['/pointTypes/{pointTypeId}']: {
    /**
     * deletePointType
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePointType.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePointType.Responses.$204 | Paths.DeletePointType.Responses.Default>
    /**
     * getPointType
     */
    'get'(
      parameters?: Parameters<Paths.GetPointType.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPointType.Responses.$200 | Paths.GetPointType.Responses.Default>
    /**
     * updatePointType
     */
    'patch'(
      parameters?: Parameters<Paths.UpdatePointType.PathParameters> | null,
      data?: Paths.UpdatePointType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdatePointType.Responses.$200 | Paths.UpdatePointType.Responses.Default>
  }
  ['/scheduled-assignments']: {
    /**
     * getScheduledAssignments
     */
    'get'(
      parameters?: Parameters<Paths.GetScheduledAssignments.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetScheduledAssignments.Responses.$200 | Paths.GetScheduledAssignments.Responses.Default>
    /**
     * createScheduledAssignment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateScheduledAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateScheduledAssignment.Responses.$200 | Paths.CreateScheduledAssignment.Responses.Default>
  }
  ['/scheduled-assignments/{scheduledAssignmentId}']: {
    /**
     * deleteScheduledAssignment
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteScheduledAssignment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteScheduledAssignment.Responses.$204 | Paths.DeleteScheduledAssignment.Responses.Default>
    /**
     * getScheduledAssignment
     */
    'get'(
      parameters?: Parameters<Paths.GetScheduledAssignment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetScheduledAssignment.Responses.$200 | Paths.GetScheduledAssignment.Responses.Default>
    /**
     * updateScheduledAssignment
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateScheduledAssignment.PathParameters> | null,
      data?: Paths.UpdateScheduledAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateScheduledAssignment.Responses.$200 | Paths.UpdateScheduledAssignment.Responses.Default>
  }
  ['/scheduled-assignments/{scheduledAssignmentId}/students/{studentId}/evaluate']: {
    /**
     * evaluateStudentAssignment - Evaluate a student’s points for a scheduled assignment
     */
    'put'(
      parameters?: Parameters<Paths.EvaluateStudentAssignment.PathParameters> | null,
      data?: Paths.EvaluateStudentAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EvaluateStudentAssignment.Responses.$200 | Paths.EvaluateStudentAssignment.Responses.$201 | Paths.EvaluateStudentAssignment.Responses.Default>
  }
  ['/scheduled-lessons']: {
    /**
     * getScheduledLessons
     */
    'get'(
      parameters?: Parameters<Paths.GetScheduledLessons.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetScheduledLessons.Responses.$200 | Paths.GetScheduledLessons.Responses.Default>
    /**
     * createScheduledLesson
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateScheduledLesson.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateScheduledLesson.Responses.$200 | Paths.CreateScheduledLesson.Responses.Default>
  }
  ['/scheduled-lessons/{scheduledLessonId}']: {
    /**
     * deleteScheduledLesson
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteScheduledLesson.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteScheduledLesson.Responses.$204 | Paths.DeleteScheduledLesson.Responses.Default>
    /**
     * getScheduledLesson
     */
    'get'(
      parameters?: Parameters<Paths.GetScheduledLesson.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetScheduledLesson.Responses.$200 | Paths.GetScheduledLesson.Responses.Default>
    /**
     * updateScheduledLesson
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateScheduledLesson.PathParameters> | null,
      data?: Paths.UpdateScheduledLesson.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateScheduledLesson.Responses.$200 | Paths.UpdateScheduledLesson.Responses.Default>
  }
  ['/scheduled-lessons/{scheduledLessonId}/attendance']: {
    /**
     * setScheduledLessonAttendanceRecords
     */
    'put'(
      parameters?: Parameters<Paths.SetScheduledLessonAttendanceRecords.PathParameters> | null,
      data?: Paths.SetScheduledLessonAttendanceRecords.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetScheduledLessonAttendanceRecords.Responses.$200 | Paths.SetScheduledLessonAttendanceRecords.Responses.Default>
  }
  ['/scheduled-lessons/{scheduledLessonId}/shift']: {
    /**
     * scheduledLessonShift
     */
    'post'(
      parameters?: Parameters<Paths.ScheduledLessonShift.PathParameters> | null,
      data?: Paths.ScheduledLessonShift.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ScheduledLessonShift.Responses.$200 | Paths.ScheduledLessonShift.Responses.Default>
  }
  ['/scheduled-lessons/schedule/students']: {
    /**
     * getStudentSchedule
     */
    'get'(
      parameters?: Parameters<Paths.GetStudentSchedule.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStudentSchedule.Responses.$200 | Paths.GetStudentSchedule.Responses.Default>
  }
  ['/schools']: {
    /**
     * getSchools
     */
    'get'(
      parameters?: Parameters<Paths.GetSchools.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchools.Responses.$200 | Paths.GetSchools.Responses.Default>
    /**
     * createSchool
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSchool.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSchool.Responses.$200 | Paths.CreateSchool.Responses.Default>
  }
  ['/schools/{schoolId}']: {
    /**
     * deleteSchool
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSchool.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSchool.Responses.$204 | Paths.DeleteSchool.Responses.Default>
    /**
     * getSchool
     */
    'get'(
      parameters?: Parameters<Paths.GetSchool.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchool.Responses.$200 | Paths.GetSchool.Responses.Default>
    /**
     * updateSchool
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateSchool.PathParameters> | null,
      data?: Paths.UpdateSchool.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSchool.Responses.$200 | Paths.UpdateSchool.Responses.Default>
  }
  ['/schools/{schoolId}/client-fields/change-order']: {
    /**
     * changeClientFieldsOrder
     */
    'post'(
      parameters?: Parameters<Paths.ChangeClientFieldsOrder.PathParameters> | null,
      data?: Paths.ChangeClientFieldsOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeClientFieldsOrder.Responses.$204 | Paths.ChangeClientFieldsOrder.Responses.Default>
  }
  ['/schools/{schoolId}/usernames']: {
    /**
     * getSchoolUsernames - Returns a free username for the specified school
     */
    'get'(
      parameters?: Parameters<Paths.GetSchoolUsernames.QueryParameters & Paths.GetSchoolUsernames.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchoolUsernames.Responses.$200 | Paths.GetSchoolUsernames.Responses.Default>
  }
  ['/study-materials']: {
    /**
     * getStudyMaterials
     */
    'get'(
      parameters?: Parameters<Paths.GetStudyMaterials.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStudyMaterials.Responses.$200 | Paths.GetStudyMaterials.Responses.Default>
    /**
     * createStudyMaterial
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateStudyMaterial.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateStudyMaterial.Responses.$200 | Paths.CreateStudyMaterial.Responses.Default>
  }
  ['/study-materials/{studyMaterialId}']: {
    /**
     * deleteStudyMaterial
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteStudyMaterial.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteStudyMaterial.Responses.$204 | Paths.DeleteStudyMaterial.Responses.Default>
    /**
     * getStudyMaterial
     */
    'get'(
      parameters?: Parameters<Paths.GetStudyMaterial.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStudyMaterial.Responses.$200 | Paths.GetStudyMaterial.Responses.Default>
    /**
     * updateStudyMaterial
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateStudyMaterial.PathParameters> | null,
      data?: Paths.UpdateStudyMaterial.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateStudyMaterial.Responses.$200 | Paths.UpdateStudyMaterial.Responses.Default>
  }
  ['/users']: {
    /**
     * getUsers
     */
    'get'(
      parameters?: Parameters<Paths.GetUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUsers.Responses.$200 | Paths.GetUsers.Responses.Default>
    /**
     * createUser
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateUser.Responses.$200 | Paths.CreateUser.Responses.Default>
  }
  ['/users/{userId}']: {
    /**
     * deleteUser
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUser.Responses.$204 | Paths.DeleteUser.Responses.Default>
    /**
     * getUser
     */
    'get'(
      parameters?: Parameters<Paths.GetUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUser.Responses.$200 | Paths.GetUser.Responses.Default>
    /**
     * updateUser
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
      data?: Paths.UpdateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUser.Responses.$200 | Paths.UpdateUser.Responses.Default>
  }
  ['/users/{userId}/avatar']: {
    /**
     * deleteUserAvatar
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUserAvatar.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUserAvatar.Responses.$204 | Paths.DeleteUserAvatar.Responses.Default>
    /**
     * updateUserAvatar - Returns PUT link to upload a new avatar
     */
    'post'(
      parameters?: Parameters<Paths.UpdateUserAvatar.PathParameters> | null,
      data?: Paths.UpdateUserAvatar.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserAvatar.Responses.$200 | Paths.UpdateUserAvatar.Responses.Default>
  }
  ['/users/{userId}/student']: {
    /**
     * getUserStudent
     */
    'get'(
      parameters?: Parameters<Paths.GetUserStudent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserStudent.Responses.$200 | Paths.GetUserStudent.Responses.Default>
  }
  ['/users/{userId}/student/change-password']: {
    /**
     * changeStudentPassword
     */
    'post'(
      parameters?: Parameters<Paths.ChangeStudentPassword.PathParameters> | null,
      data?: Paths.ChangeStudentPassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeStudentPassword.Responses.$204 | Paths.ChangeStudentPassword.Responses.Default>
  }
  ['/users/{userId}/student/wallets/{walletId}/manual-credit']: {
    /**
     * userStudentWalletsManualCredit
     */
    'post'(
      parameters?: Parameters<Paths.UserStudentWalletsManualCredit.PathParameters> | null,
      data?: Paths.UserStudentWalletsManualCredit.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserStudentWalletsManualCredit.Responses.$204 | Paths.UserStudentWalletsManualCredit.Responses.Default>
  }
  ['/users/{userId}/student/wallets/{walletId}/manual-debit']: {
    /**
     * userStudentWalletsManualDebit
     */
    'post'(
      parameters?: Parameters<Paths.UserStudentWalletsManualDebit.PathParameters> | null,
      data?: Paths.UserStudentWalletsManualDebit.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserStudentWalletsManualDebit.Responses.$204 | Paths.UserStudentWalletsManualDebit.Responses.Default>
  }
  ['/users/{userId}/student/wallets/{walletId}/transactions']: {
    /**
     * userStudentWalletsTransactions
     */
    'get'(
      parameters?: Parameters<Paths.UserStudentWalletsTransactions.QueryParameters & Paths.UserStudentWalletsTransactions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserStudentWalletsTransactions.Responses.$200 | Paths.UserStudentWalletsTransactions.Responses.Default>
  }
  ['/users/{userId}/teacher/reports']: {
    /**
     * userTeacherReports
     */
    'get'(
      parameters?: Parameters<Paths.UserTeacherReports.QueryParameters & Paths.UserTeacherReports.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserTeacherReports.Responses.$200 | Paths.UserTeacherReports.Responses.Default>
  }
  ['/users/{userId}/teacher/reports/excel']: {
    /**
     * userTeacherReportsExcel
     */
    'post'(
      parameters?: Parameters<Paths.UserTeacherReportsExcel.QueryParameters & Paths.UserTeacherReportsExcel.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserTeacherReportsExcel.Responses.$200 | Paths.UserTeacherReportsExcel.Responses.Default>
  }
  ['/users/{userId}/teacher/reports/excel/{excelFileId}']: {
    /**
     * userTeacherReportsGetExcel
     */
    'get'(
      parameters?: Parameters<Paths.UserTeacherReportsGetExcel.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserTeacherReportsGetExcel.Responses.Default>
  }
  ['/users/change-password']: {
    /**
     * changePassword
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ChangePassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangePassword.Responses.$204 | Paths.ChangePassword.Responses.Default>
  }
  ['/users/recovery-password']: {
    /**
     * recoveryPassword
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RecoveryPassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RecoveryPassword.Responses.$204 | Paths.RecoveryPassword.Responses.Default>
  }
  ['/users/recovery-password/send-link']: {
    /**
     * recoveryPasswordSendLink
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RecoveryPasswordSendLink.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RecoveryPasswordSendLink.Responses.$204 | Paths.RecoveryPasswordSendLink.Responses.Default>
  }
  ['/users/register']: {
    /**
     * register
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Register.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Register.Responses.$204 | Paths.Register.Responses.Default>
  }
  ['/users/register/confirm-email']: {
    /**
     * registerConfirmEmail
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RegisterConfirmEmail.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegisterConfirmEmail.Responses.$200 | Paths.RegisterConfirmEmail.Responses.Default>
  }
  ['/users/register/send-code']: {
    /**
     * registerSendCode
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RegisterSendCode.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegisterSendCode.Responses.$204 | Paths.RegisterSendCode.Responses.Default>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AbsenceReason = Components.Schemas.AbsenceReason;
export type AbsenceReasonCreation = Components.Schemas.AbsenceReasonCreation;
export type AbsenceReasonUpdate = Components.Schemas.AbsenceReasonUpdate;
export type Application = Components.Schemas.Application;
export type Assignment = Components.Schemas.Assignment;
export type AssignmentCreation = Components.Schemas.AssignmentCreation;
export type AssignmentSnapshot = Components.Schemas.AssignmentSnapshot;
export type AssignmentSubmission = Components.Schemas.AssignmentSubmission;
export type AssignmentSubmissionCreation = Components.Schemas.AssignmentSubmissionCreation;
export type AssignmentSubmissionEvaluation = Components.Schemas.AssignmentSubmissionEvaluation;
export type AssignmentSubmissionEvaluationStatus = Components.Schemas.AssignmentSubmissionEvaluationStatus;
export type AssignmentSubmissionMaterial = Components.Schemas.AssignmentSubmissionMaterial;
export type AssignmentSubmissionMaterialCreation = Components.Schemas.AssignmentSubmissionMaterialCreation;
export type AssignmentSubmissionStatus = Components.Schemas.AssignmentSubmissionStatus;
export type AssignmentSubmissionUpdate = Components.Schemas.AssignmentSubmissionUpdate;
export type AssignmentType = Components.Schemas.AssignmentType;
export type AssignmentUpdate = Components.Schemas.AssignmentUpdate;
export type AssignmentsAdditionReuqest = Components.Schemas.AssignmentsAdditionReuqest;
export type AttendanceRecord = Components.Schemas.AttendanceRecord;
export type AttendanceRecordForUser = Components.Schemas.AttendanceRecordForUser;
export type AttendanceStatus = Components.Schemas.AttendanceStatus;
export type AvatarFileName = Components.Schemas.AvatarFileName;
export type Branch = Components.Schemas.Branch;
export type BranchCreation = Components.Schemas.BranchCreation;
export type BranchUpdate = Components.Schemas.BranchUpdate;
export type ChangePassword = Components.Schemas.ChangePassword;
export type ChangeStudentPassword = Components.Schemas.ChangeStudentPassword;
export type Client = Components.Schemas.Client;
export type ClientCreation = Components.Schemas.ClientCreation;
export type ClientField = Components.Schemas.ClientField;
export type ClientFieldCreation = Components.Schemas.ClientFieldCreation;
export type ClientFieldStringPattern = Components.Schemas.ClientFieldStringPattern;
export type ClientFieldType = Components.Schemas.ClientFieldType;
export type ClientFieldUpdate = Components.Schemas.ClientFieldUpdate;
export type ClientFieldValue = Components.Schemas.ClientFieldValue;
export type ClientFieldValueSet = Components.Schemas.ClientFieldValueSet;
export type ClientUpdate = Components.Schemas.ClientUpdate;
export type Course = Components.Schemas.Course;
export type CourseContentChanges = Components.Schemas.CourseContentChanges;
export type CourseContentRemovals = Components.Schemas.CourseContentRemovals;
export type CourseCreation = Components.Schemas.CourseCreation;
export type CourseUpdate = Components.Schemas.CourseUpdate;
export type DateTime = Components.Schemas.DateTime;
export type Error = Components.Schemas.Error;
export type ExcelId = Components.Schemas.ExcelId;
export type File = Components.Schemas.File;
export type FileSize = Components.Schemas.FileSize;
export type GetLink = Components.Schemas.GetLink;
export type Group = Components.Schemas.Group;
export type GroupCourse = Components.Schemas.GroupCourse;
export type GroupCourseCreation = Components.Schemas.GroupCourseCreation;
export type GroupCourseLessonsSchedule = Components.Schemas.GroupCourseLessonsSchedule;
export type GroupCourseLessonsScheduleDay = Components.Schemas.GroupCourseLessonsScheduleDay;
export type GroupCourseSyncRequest = Components.Schemas.GroupCourseSyncRequest;
export type GroupCourseUpdate = Components.Schemas.GroupCourseUpdate;
export type GroupCreation = Components.Schemas.GroupCreation;
export type GroupUpdate = Components.Schemas.GroupUpdate;
export type GroupWithSubscriptions = Components.Schemas.GroupWithSubscriptions;
export type GroupWithoutPointType = Components.Schemas.GroupWithoutPointType;
export type HealthStatus = Components.Schemas.HealthStatus;
export type Language = Components.Schemas.Language;
export type Lesson = Components.Schemas.Lesson;
export type LessonAssignmentChanges = Components.Schemas.LessonAssignmentChanges;
export type LessonAssignmentRemovals = Components.Schemas.LessonAssignmentRemovals;
export type LessonAssignmentsAddition = Components.Schemas.LessonAssignmentsAddition;
export type LessonCreation = Components.Schemas.LessonCreation;
export type LessonSnapshot = Components.Schemas.LessonSnapshot;
export type LessonSubscription = Components.Schemas.LessonSubscription;
export type LessonSubscriptionCreation = Components.Schemas.LessonSubscriptionCreation;
export type LessonUpdate = Components.Schemas.LessonUpdate;
export type Login = Components.Schemas.Login;
export type MiniAssignmentSubmission = Components.Schemas.MiniAssignmentSubmission;
export type MiniClient = Components.Schemas.MiniClient;
export type MiniScheduledAssignment = Components.Schemas.MiniScheduledAssignment;
export type MiniScheduledLesson = Components.Schemas.MiniScheduledLesson;
export type MiniUser = Components.Schemas.MiniUser;
export type Notification = Components.Schemas.Notification;
export type NotificationParametersLessonSubscriptionExpiring = Components.Schemas.NotificationParametersLessonSubscriptionExpiring;
export type NotificationType = Components.Schemas.NotificationType;
export type OrderChanging = Components.Schemas.OrderChanging;
export type PaginationMetadata = Components.Schemas.PaginationMetadata;
export type PointAmountTransaction = Components.Schemas.PointAmountTransaction;
export type PointType = Components.Schemas.PointType;
export type PointTypeCreation = Components.Schemas.PointTypeCreation;
export type PointTypeUpdate = Components.Schemas.PointTypeUpdate;
export type PointWallet = Components.Schemas.PointWallet;
export type PointWalletTransaction = Components.Schemas.PointWalletTransaction;
export type PointWalletTransactionType = Components.Schemas.PointWalletTransactionType;
export type PutLink = Components.Schemas.PutLink;
export type RecoveryPassword = Components.Schemas.RecoveryPassword;
export type RecoveryPasswordSendLink = Components.Schemas.RecoveryPasswordSendLink;
export type RelatedClients = Components.Schemas.RelatedClients;
export type ScheduledAssignment = Components.Schemas.ScheduledAssignment;
export type ScheduledAssignmentCreation = Components.Schemas.ScheduledAssignmentCreation;
export type ScheduledAssignmentUpdate = Components.Schemas.ScheduledAssignmentUpdate;
export type ScheduledLesson = Components.Schemas.ScheduledLesson;
export type ScheduledLessonCreation = Components.Schemas.ScheduledLessonCreation;
export type ScheduledLessonShift = Components.Schemas.ScheduledLessonShift;
export type ScheduledLessonUpdate = Components.Schemas.ScheduledLessonUpdate;
export type School = Components.Schemas.School;
export type SchoolCreation = Components.Schemas.SchoolCreation;
export type SchoolUpdate = Components.Schemas.SchoolUpdate;
export type SchoolUsernames = Components.Schemas.SchoolUsernames;
export type SetAttendanceRecord = Components.Schemas.SetAttendanceRecord;
export type SetAttendanceRecords = Components.Schemas.SetAttendanceRecords;
export type SimpleClient = Components.Schemas.SimpleClient;
export type SortDirection = Components.Schemas.SortDirection;
export type StudentAssignmentSubmission = Components.Schemas.StudentAssignmentSubmission;
export type StudentGroupSubscription = Components.Schemas.StudentGroupSubscription;
export type StudentSchedule = Components.Schemas.StudentSchedule;
export type StudyMaterial = Components.Schemas.StudyMaterial;
export type StudyMaterialCreation = Components.Schemas.StudyMaterialCreation;
export type StudyMaterialUpdate = Components.Schemas.StudyMaterialUpdate;
export type Subcode = Components.Schemas.Subcode;
export type TeacherReport = Components.Schemas.TeacherReport;
export type Time = Components.Schemas.Time;
export type Token = Components.Schemas.Token;
export type Tokens = Components.Schemas.Tokens;
export type UTCOffset = Components.Schemas.UTCOffset;
export type UUID = Components.Schemas.UUID;
export type User = Components.Schemas.User;
export type UserCreation = Components.Schemas.UserCreation;
export type UserRegistration = Components.Schemas.UserRegistration;
export type UserRegistrationConfirmEmail = Components.Schemas.UserRegistrationConfirmEmail;
export type UserRegistrationEmail = Components.Schemas.UserRegistrationEmail;
export type UserRole = Components.Schemas.UserRole;
export type UserStudent = Components.Schemas.UserStudent;
export type UserUpdate = Components.Schemas.UserUpdate;
export type Weekday = Components.Schemas.Weekday;
