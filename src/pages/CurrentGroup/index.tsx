import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import { format } from "date-fns";

import { AppDispatch, RootState } from "@/app/store";
import { User } from "@/entities/User";
import { clearCurrentGroup, fetchGroupAsync } from "@/entities/Group";
import {
  clearGroupCoursePagination,
  fetchAllGroupCoursesAsync,
} from "@/entities/GroupCourse";
import { useQuery } from "@tanstack/react-query";
import { ScheduledLessonAPI } from "@/entities/ScheduledLesson";
import { Pagination } from "@/entities/Common";
import { StudentSchedule } from "@/entities/ScheduledLesson";
import { UserAPI } from "@/entities/User";
import { clearUserPagination, fetchAllUsersAsync } from "@/entities/User";
import Card from "@/shared/ui/Card";

import bannerImage from "@/shared/assets/images/banner.png";
import "./style.css";
import { useIsPortrait } from "@/shared/lib/hooks/isPortrait";
import { useTranslation } from "react-i18next";

const CurrentGroupPage: React.FC = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const isPortrait = useIsPortrait();

  const dispatch = useDispatch<AppDispatch>();

  const [currentTeacher, setCurrentTeacher] = useState<User | undefined>(
    undefined
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const students = useSelector((state: RootState) => state.user.userPagination);

  const currentGroup = useSelector(
    (state: RootState) => state.group.currentGroup
  );

  const groupCourses = useSelector(
    (state: RootState) => state.groupCourse.groupCoursesPagination
  );

  const { data: scheduleData } = useQuery({
    queryKey: ["groupNextLesson", id, user?.id],
    queryFn: () => {
      if (!id || !user?.id) return null;
      return ScheduledLessonAPI.fetchStudentSchedule({
        page: 1,
        pageSize: 1,
        studentId: user.id,
        groupId: id,
        startDate: new Date(),
      });
    },
    enabled: !!id && !!user?.id,
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchAllGroupCoursesAsync({
          page: 1,
          pageSize: 100,
          schoolId: user?.schoolId!,
          groupId: id!,
        })
      );
      dispatch(
        fetchAllUsersAsync({
          page: 1,
          pageSize: 100,
          schoolId: user?.schoolId!,
          groupId: id!,
        })
      );
      dispatch(fetchGroupAsync(id!));
    };
    fetchData();

    return () => {
      dispatch(clearCurrentGroup());
      dispatch(clearGroupCoursePagination());
      dispatch(clearUserPagination());
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchTeacher = async () => {
      const nextLesson = scheduleData?.items[0];
      if (nextLesson?.scheduledLesson.teacherId) {
        const teacher = await UserAPI.fetchUserById(
          nextLesson.scheduledLesson.teacherId
        );
        setCurrentTeacher(teacher);
      }
    };
    fetchTeacher();
  }, [scheduleData]);

  const teachers = new Set(
    groupCourses?.items.map((groupCourse) => {
      return `${groupCourse.teacher.firstName} ${groupCourse.teacher.lastName}`;
    })
  );

  return (
    <>
      <div className="page">
        <div
          className="main-grid"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div></div>
          <div className="main-info-group">
            <div className="group-info-container">
              <Card
                className="accent-border"
                style={{ gap: "30px", marginBottom: "30px" }}
              >
                {currentGroup && groupCourses ? (
                  <>
                    <center>
                      <h1>{currentGroup?.name}</h1>
                    </center>
                    <div className="group-info">
                      <span>{t("Следующее занятие")}:</span>
                      <div>
                        {scheduleData?.items[0]?.scheduledLesson.isActive && (
                          <>
                            <span>
                              {scheduleData?.items[0]?.scheduledLesson.lesson.name}
                            </span>
                            <br />
                            <br />
                          </>
                        )}
                        <span>
                          {scheduleData?.items[0]?.scheduledLesson.startAt &&
                            format(
                              scheduleData?.items[0]?.scheduledLesson.startAt,
                              "dd.MM.yyyy"
                            )}
                        </span>
                      </div>
                      <span>
                        {currentTeacher
                          ? t("Преподаватель")
                          : t("Преподаватели")}
                        :
                      </span>
                      <span>
                        {currentTeacher
                          ? `${currentTeacher?.firstName} ${currentTeacher?.lastName}`
                          : `${[...teachers].join(", ")}`}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
                  </div>
                )}
              </Card>
              {!isPortrait && (
                <Card
                  className="accent-border"
                  style={{
                    paddingBottom: "0px",
                    paddingLeft: "45px",
                    paddingRight: "15px",
                  }}
                >
                  <img
                    src={bannerImage}
                    alt="Banner"
                    className="group-banner-image"
                  />
                </Card>
              )}
            </div>
            <div className="group-students-container">
              <Card
                className="accent-2-border"
                style={{
                  gap: "0px",
                  paddingBottom: "0px",
                  marginBottom: "30px",
                }}
              >
                <div style={{ padding: "20px" }}>
                  <h2>{t("Список группы")}:</h2>
                </div>
                {students ? (
                  <ul className="student-list">
                    {students?.items.map((student, index) => (
                      <li key={student.id} className="student-item">
                        <span>{`${index + 1}. ${student.firstName} ${
                          student.lastName
                        }`}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent-2)]"></div>
                  </div>
                )}
              </Card>
              {isPortrait && (
                <Card
                  className="accent-border"
                  style={{
                    paddingBottom: "0px",
                    paddingLeft: "45px",
                    paddingRight: "15px",
                  }}
                >
                  <img
                    src={bannerImage}
                    alt="Banner"
                    className="group-banner-image"
                  />
                </Card>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default CurrentGroupPage;
