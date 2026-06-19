import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/entities/Auth/model/slice";
import groupReducer from "@/entities/Group/model/slice";
import groupCourseReducer from "@/entities/GroupCourse/model/slice";
import scheduledLessonReducer from "@/entities/ScheduledLesson/model/slice";
import scheduledAssignmentReducer from "@/entities/ScheduledAssignment/model/slice";
import userReducer from "@/entities/User/model/slice";
import studyMaterialReducer from "@/entities/StudyMaterial/model/slice";
import assignmentSubmissionReducer from "@/entities/AssignmentSubmission/model/slice";
import assignmentSubmissionMaterialReducer from "@/entities/AssignmentSubmissionMaterial/model/slice";
import appReducer from "@/app/model/appSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    groupCourse: groupCourseReducer,
    scheduledLesson: scheduledLessonReducer,
    scheduledAssignment: scheduledAssignmentReducer,
    user: userReducer,
    studyMaterial: studyMaterialReducer,
    assignmentSubmission: assignmentSubmissionReducer,
    assignmentSubmissionMaterial: assignmentSubmissionMaterialReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
