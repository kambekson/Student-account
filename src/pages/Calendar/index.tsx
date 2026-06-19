import { setCurrentPageId } from "@/app/model/appSlice";
import ScheduleCalendar from "@/widgets/ScheduleCalendar";
import { AppDispatch, RootState } from "@/app/store";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useStudentSchedule } from "./hooks";
import { notifyError } from "@/shared/ui/Toasts/options";
import { useQueryClient } from "@tanstack/react-query";

import "./style.css";
import { useTranslation } from "react-i18next";

const CalendarPage: React.FC = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const {
    isLoading,
    data: scheduleData,
    error,
  } = useStudentSchedule(user?.id, selectedDate);

  useEffect(() => {
    dispatch(setCurrentPageId("calendar"));

    return () => {
      queryClient.invalidateQueries({ queryKey: ["studentSchedule"] });
      dispatch(setCurrentPageId(undefined));
    };
  }, [dispatch, queryClient]);

  useEffect(() => {
    if (!error) return;
    notifyError(t("Ошибка при загрузке расписания"), error.message);
  }, [error]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      {isLoading && (
        <Loader>
          <CircularProgress color="primary" size={60} />
        </Loader>
      )}
      <div className="schedule-calendar-wrapper">
        <ScheduleCalendar
          schedules={scheduleData ?? []}
          onDateChange={handleDateChange}
        />
      </div>
    </>
  );
};

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export default CalendarPage;
