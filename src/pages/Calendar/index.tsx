import { setCurrentPageId } from "@/app/model/appSlice";
import ScheduleCalendar from "@/widgets/ScheduleCalendar";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  }, [error, t]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent-2)]"></div>
        </div>
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

export default CalendarPage;
