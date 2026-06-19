import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import { IoIosArrowForward } from "react-icons/io";

import { AppDispatch, RootState } from "@/app/store";
import Card from "@/shared/ui/Card";

import "./style.css";

import { fetchAllGroupCoursesAsync } from "@/entities/GroupCourse";
import { fetchAllGroupsAsync } from "@/entities/Group";
import { DataStatus } from "@/shared/lib/store/types";
import { userService } from "@/entities/User";
import { checkAuthAsync } from "@/entities/Auth";
import {
  notifyError,
  notifySuccess,
} from "@/shared/ui/Toasts/options";
import { UserStudent, UserUpdate } from "@/entities/User";
import { UserAPI } from "@/entities/User";

import { setCurrentPageId } from "@/app/model/appSlice";
import { UserInfo } from "./UserInfo";
import { useTranslation } from "react-i18next";

enum CourseListType {
  ActiveCourses = "ActiveCourses",
  AllCourses = "AllCourses",
}

const PersonalPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const { t } = useTranslation();

  const [courseListType, setCourseListType] = useState(
    CourseListType.ActiveCourses
  );

  const user = useSelector((state: RootState) => state.auth.user);
  const [userStudent, setUserStudent] = useState<UserStudent | undefined>(
    undefined
  );

  const groups = useSelector(
    (state: RootState) => state.group.groupPagination?.items
  );
  const groupsStatus = useSelector((state: RootState) => state.group.status);

  const groupCourses = useSelector(
    (state: RootState) => state.groupCourse.groupCoursesPagination?.items
  );
  const groupCoursesStatus = useSelector(
    (state: RootState) => state.groupCourse.status
  );

  useEffect(() => {
    if (user?.id) {
      UserAPI.fetchUserStudentById(user.id).then((userStudent) => {
        setUserStudent(userStudent);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    dispatch(setCurrentPageId("profile"));

    dispatch(
      fetchAllGroupsAsync({
        page: 1,
        pageSize: 100,
        schoolId: user?.schoolId!,
        studentId: user?.id!,
      })
    );

    return () => {
      dispatch(setCurrentPageId(undefined));
    };
  }, [dispatch]);

  useEffect(() => {
    if (groups !== undefined && groups?.length !== 0) {
      dispatch(
        fetchAllGroupCoursesAsync({
          page: 1,
          pageSize: 100,
          schoolId: user?.schoolId!,
          studentId: user?.id!,
          isCompleted:
            courseListType === CourseListType.ActiveCourses ? false : undefined,
        })
      );
    }
  }, [dispatch, groups, courseListType]);

  const handleLogout = (): void => {
    navigate("/confirm-exit");
  };

  const handleToGroup = (id: string): void => {
    navigate(`/groups/${id}`);
  };

  const handleToGroupCourse = (id: string): void => {
    navigate(`/group-courses/${id}`);
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      setIsUpdatingUser(true);
      await userService.updateUserAvatar(user?.id!, file);
      await dispatch(checkAuthAsync());
      notifySuccess(`${t("Аватар успешно обновлен")}.`, "");
    } catch (error: any) {
      notifyError(
        `${t("Не удалось обновить аватар")}.`,
        `${t("Ошибка")}: ${error.message || t("Неизвестная ошибка")}`
      );
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const handleUpdateUser = async (userUpdate: UserUpdate) => {
    try {
      setIsUpdatingUser(true);

      let update = {} as UserUpdate;

      if (userUpdate.firstName !== user?.firstName) {
        update = {
          ...update,
          firstName: userUpdate.firstName,
        };
      }

      if (userUpdate.lastName !== user?.lastName) {
        update = {
          ...update,
          lastName: userUpdate.lastName,
        };
      }

      if (update.firstName || update.lastName) {
        {
          await UserAPI.updateUser(user!.id, update);
          await dispatch(checkAuthAsync());
        }

        notifySuccess(`${t("Данные успешно обновлены")}.`, "");
      }
    } catch (error: any) {
      notifyError(
        `${t("Не удалось обновить данные")}.`,
        `${t("Ошибка")}: ${error.message || t("Неизвестная ошибка")}`
      );
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const handleOnBalanceClick = () => {
    navigate("/wallets");
  };

  return (
    <>
      {isUpdatingUser && (
        <div className="loading-overlay">
          <CircularProgress color="primary" size={60} />
        </div>
      )}
      <div className="page">
        <div
          className="main-grid"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div></div>
          <div className="main-info-group">
            <div>
              <UserInfo
                user={user}
                userStudent={userStudent}
                isUpdatingAvatar={isUpdatingUser}
                handleAvatarUpload={handleAvatarUpload}
                handleLogout={handleLogout}
                handleUpdateUser={handleUpdateUser}
                handleOnBalanceClick={handleOnBalanceClick}
              />
            </div>
            <div className="study-info-group">
              {groupsStatus !== DataStatus.LOADING && groups?.length === 0 ? (
                <></>
              ) : (
                <Card className="accent-border" style={{ gap: "30px" }}>
                  {groupsStatus === DataStatus.LOADING ? (
                    <center>
                      <CircularProgress color="primary" />
                    </center>
                  ) : (
                    groups?.map((group) => (
                      <div className="group-list" key={group.id}>
                        <h2>{group.name}</h2>
                        <button
                          className="primary-button"
                          onClick={() => handleToGroup(group.id)}
                        >
                          <span>{t("больше о группе")}</span>
                        </button>
                      </div>
                    ))
                  )}
                </Card>
              )}
              {groupCoursesStatus !== DataStatus.LOADING &&
              groupCourses?.length === 0 ? (
                <></>
              ) : (
                <Card>
                  <div className="tabs">
                    <button
                      className={`tab ${
                        courseListType === CourseListType.ActiveCourses
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCourseListType(CourseListType.ActiveCourses)
                      }
                    >
                      <h2
                        className={"regular"}
                        style={{
                          color: `${
                            courseListType !== CourseListType.ActiveCourses
                              ? "var(--color-background-2)"
                              : ""
                          }`,
                        }}
                      >
                        {t("Активные курсы")}
                      </h2>
                    </button>
                    <button
                      className={`tab ${
                        courseListType === CourseListType.AllCourses
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCourseListType(CourseListType.AllCourses)
                      }
                    >
                      <h2
                        className={"regular"}
                        style={{
                          color: `${
                            courseListType !== CourseListType.AllCourses
                              ? "var(--color-background-2)"
                              : ""
                          }`,
                        }}
                      >
                        {t("Все курсы")}
                      </h2>
                    </button>
                  </div>
                  {groupCoursesStatus === DataStatus.LOADING ? (
                    <center>
                      <CircularProgress color="primary" />
                    </center>
                  ) : (
                    <div className="courses-info">
                      {groupCourses?.map((groupCourse) => (
                        <Card
                          style={{
                            backgroundColor: "var(--color-background)",
                            gap: "20px",
                            justifyContent: "space-between",
                          }}
                        >
                          <h2>{groupCourse.course.name}</h2>
                          {groupCourse.completedAt ? (
                            <div className="go-to-course">
                              <span>{t("курс завершён")}</span>
                              <div
                                className="go-to-button completed"
                                onClick={() => {
                                  handleToGroupCourse(groupCourse.id);
                                }}
                              >
                                <IoIosArrowForward size={"15px"} />
                              </div>
                            </div>
                          ) : (
                            <div className="go-to-course">
                              <span>{t("к занятиям")}</span>
                              <div
                                className="go-to-button"
                                onClick={() => {
                                  handleToGroupCourse(groupCourse.id);
                                }}
                              >
                                <IoIosArrowForward size={"15px"} />
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
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

export default PersonalPage;
