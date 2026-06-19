import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Domain/Slice/Auth";
import groupReducer from "./Domain/Slice/Group";
import groupCourseReducer from "./Domain/Slice/GroupCourse";
import scheduledLessonReducer from "./Domain/Slice/ScheduledLesson";
import scheduledAssignmentReducer from "./Domain/Slice/ScheduledAssignment";
import userReducer from "./Domain/Slice/User";
import studyMaterialReducer from "./Domain/Slice/StudyMaterial";
import assignmentSubmissionReducer from "./Domain/Slice/AssignmentSubmission";
import assignmentSubmissionMaterialReducer from "./Domain/Slice/AssignmentSubmissionMaterial";
import appReducer from "./Domain/Slice/App";

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
