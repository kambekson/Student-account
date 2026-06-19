import { format, isSameDay } from "date-fns";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ru } from "react-day-picker/locale";

import { StudentSchedule } from "@/entities/ScheduledLesson";
import { useCalendar, useScheduleData } from "./hooks";
import CurrentDayMarker from "@/shared/assets/icons/current-date-overlay.svg?react";
import { useIsPortrait } from "@/shared/lib/hooks/isPortrait";
import { useTranslation } from "react-i18next";
import i18n from "@/app/i18n";

interface ScheduleCalendarProps {
  schedules: StudentSchedule[];
  onDateChange?: (date: Date) => void;
}

const ScheduleCalendar: FC<ScheduleCalendarProps> = ({
  schedules,
  onDateChange,
}) => {
  const isPortrait = useIsPortrait();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const DAYS_OF_WEEK = [
    t("Пн"),
    t("Вт"),
    t("Ср"),
    t("Чт"),
    t("Пт"),
    t("Сб"),
    t("Вс"),
  ];

  const { currentDate, calendarDays, goToPreviousMonth, goToNextMonth } =
    useCalendar();
  const { getSchedulesForDay } = useScheduleData(schedules);

  useEffect(() => {
    if (onDateChange) {
      onDateChange(currentDate);
    }
  }, [currentDate, onDateChange]);

  const formatMonthYear = (date: Date): string => {
    return new Intl.DateTimeFormat(i18n.language, {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const [selected, setSelected] = useState<Date>();
  const [schedulesForDay, setSchedulesForDay] = useState<StudentSchedule[]>([]);

  const handleSelectDate = (date: Date | undefined) => {
    if (date !== undefined) {
      setSchedulesForDay(getSchedulesForDay(date));
    } else {
      setSchedulesForDay([]);
    }
    setSelected(date);
  };

  return (
    <>
      {isPortrait ? (
        <>
          <DayPicker
            animate
            mode="single"
            selected={selected}
            onSelect={handleSelectDate}
            onNextClick={goToNextMonth}
            onPrevClick={goToPreviousMonth}
            locale={ru}
            modifiers={{
              pastEvent: (date) =>
                getSchedulesForDay(date).length > 0 && date < new Date(),
              futureEvent: (date) =>
                getSchedulesForDay(date).length > 0 && date >= new Date(),
            }}
            modifiersClassNames={{
              pastEvent: "dot-day dot-day-past",
              futureEvent: "dot-day dot-day-future",
            }}
          />

          <div className="schedules-list flex flex-col gap-2 mt-4">
            {schedulesForDay.map((schedule) => {
              const isPast = schedule.scheduledLesson.startAt < new Date();
              const isActive = schedule.scheduledLesson.isActive;
              return (
                <div
                  key={schedule.scheduledLesson.id}
                  onClick={() => {
                    if (!isActive) return;
                    navigate(
                      `/group-courses/${schedule.scheduledLesson.groupCourseId}`,
                      {
                        state: {
                          lessonId: schedule.scheduledLesson.id,
                        },
                      }
                    );
                  }}
                  className={`rounded-[10px] p-4 text-[16px] font-normal leading-[19px] text-center relative overflow-hidden transition-all duration-300 ${
                    isPast ? "bg-[#b9ffb8]" : "bg-[#fce99a]"
                  } ${isActive ? "hover:-translate-y-[3px] hover:brightness-[1.05] cursor-pointer" : ""}`}
                >
                  {schedule.scheduledLesson.lessonSnapshot.name}
                  <br />
                  {schedule.course.name}
                  <br />
                  {format(schedule.scheduledLesson.startAt, "HH:mm")}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-black overflow-hidden font-sans relative">
          <div className="flex justify-between items-center p-4 border-b border-[#d9d9d9]">
            <button
              onClick={goToPreviousMonth}
              aria-label="Previous month"
              className="bg-transparent border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-black/5 active:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <ChevronLeft className="text-[var(--color-accent)] w-6 h-6" />
            </button>

            <h2 className="m-0 text-xl font-medium capitalize">
              {formatMonthYear(currentDate)}
            </h2>

            <button
              onClick={goToNextMonth}
              aria-label="Next month"
              className="bg-transparent border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-black/5 active:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <ChevronRight className="text-[var(--color-accent)] w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-7 border-b border-[#d9d9d9]">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-2xl font-normal leading-[29px] text-[#555555] border-r border-[#d9d9d9] last:border-r-0 relative"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const daySchedules = getSchedulesForDay(day.date);
              const isTodayDate = isSameDay(day.date, new Date());

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border-r border-b border-[#d9d9d9] [&:nth-child(7n)]:border-r-0 ${
                    day.isCurrentMonth ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div className="text-[16px] font-medium leading-[19px] mb-1.5 w-6 h-6 flex items-center justify-center relative">
                    {day.date.getDate()}
                    {isTodayDate && (
                      <div className="absolute w-10 h-[47px] translate-x-[2px] -translate-y-[2px] z-[1]">
                        <CurrentDayMarker />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-[5px]">
                    {daySchedules.map((schedule) => {
                      const isPast = schedule.scheduledLesson.startAt < new Date();
                      const isActive = schedule.scheduledLesson.isActive;
                      return (
                        <div
                          key={schedule.scheduledLesson.id}
                          onClick={() => {
                            if (!isActive) return;
                            navigate(
                              `/group-courses/${schedule.scheduledLesson.groupCourseId}`,
                              {
                                state: {
                                  lessonId: schedule.scheduledLesson.id,
                                },
                              }
                            );
                          }}
                          className={`rounded-[10px] p-4 text-[16px] font-normal leading-[19px] text-center relative overflow-hidden transition-all duration-300 group ${
                            isPast ? "bg-[#b9ffb8]" : "bg-[#fce99a]"
                          } ${isActive ? "hover:-translate-y-[3px] hover:brightness-[1.05] cursor-pointer" : ""}`}
                        >
                          {format(schedule.scheduledLesson.startAt, "HH:mm")}
                          <div className="opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-[100px] group-hover:mt-2 text-xs">
                            <div>
                              {schedule.scheduledLesson.lessonSnapshot.name}
                            </div>
                            <div className="font-semibold">{schedule.course.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleCalendar;
