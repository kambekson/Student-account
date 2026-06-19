import { format, isSameDay } from "date-fns";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ru } from "react-day-picker/locale";

import { StudentSchedule } from "@/Common/Entity/Base/ScheduledLesson";
import { useCalendar, useScheduleData } from "./hooks";
import styled from "@emotion/styled";
import CurrentDayMarker from "@/assets/icons/current-date-overlay.svg?react";
import { useIsPortrait } from "@/Domain/CustomHooks/isPortrait";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

interface ScheduleCalendarProps {
  schedules: StudentSchedule[];
  onDateChange?: (date: Date) => void;
}

const ScheduleCalendar: FC<ScheduleCalendarProps> = ({
  schedules,
  onDateChange: onDateChange,
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
      setSchedulesForDay(getSchedulesForDay(date!));
    } else {
      setSchedulesForDay([]);
    }

    return setSelected(date);
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

          <div className="schedules-list">
            {schedulesForDay.map((schedule) => (
              <LessonItem
                key={schedule.scheduledLesson.id}
                isPast={schedule.scheduledLesson.startAt < new Date()}
                isActive={schedule.scheduledLesson.isActive}
                onClick={() => {
                  if (!schedule.scheduledLesson.isActive) return;
                  navigate(
                    `/group-courses/${schedule.scheduledLesson.groupCourseId}`,
                    {
                      state: {
                        lessonId: schedule.scheduledLesson.id,
                      },
                    }
                  );
                }}
              >
                {schedule.scheduledLesson.lessonSnapshot.name}
                <br />
                {schedule.course.name}
                <br />
                {format(schedule.scheduledLesson.startAt, "HH:mm")}
              </LessonItem>
            ))}
          </div>
        </>
      ) : (
        <CalendarContainer>
          <CalendarNavigation>
            <NavigationButton
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft
                sx={{ color: "var(--color-accent)", width: 24, height: 24 }}
              />
            </NavigationButton>

            <MonthYearDisplay>{formatMonthYear(currentDate)}</MonthYearDisplay>

            <NavigationButton onClick={goToNextMonth} aria-label="Next month">
              <ChevronRight
                sx={{ color: "var(--color-accent)", width: 24, height: 24 }}
              />
            </NavigationButton>
          </CalendarNavigation>

          <CalendarHeader>
            {DAYS_OF_WEEK.map((day) => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
          </CalendarHeader>

          <CalendarGrid>
            {calendarDays.map((day, index) => {
              const daySchedules = getSchedulesForDay(day.date);
              const isTodayDate = isSameDay(day.date, new Date());

              return (
                <CalendarDay key={index} isCurrentMonth={day.isCurrentMonth}>
                  <DayNumber>
                    {day.date.getDate()}
                    {isTodayDate && <StyledCurrentDayMarker />}
                  </DayNumber>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    {daySchedules.map((schedule) => (
                      <LessonItem
                        key={schedule.scheduledLesson.id}
                        isPast={schedule.scheduledLesson.startAt < new Date()}
                        isActive={schedule.scheduledLesson.isActive}
                        onClick={() => {
                          if (!schedule.scheduledLesson.isActive) return;
                          navigate(
                            `/group-courses/${schedule.scheduledLesson.groupCourseId}`,
                            {
                              state: {
                                lessonId: schedule.scheduledLesson.id,
                              },
                            }
                          );
                        }}
                      >
                        {format(schedule.scheduledLesson.startAt, "HH:mm")}
                        <div className="details">
                          <div>
                            {schedule.scheduledLesson.lessonSnapshot.name}
                          </div>
                          <div>{schedule.course.name}</div>
                        </div>
                      </LessonItem>
                    ))}
                  </div>
                </CalendarDay>
              );
            })}
          </CalendarGrid>
        </CalendarContainer>
      )}
    </>
  );
};

const CalendarContainer = styled.div`
  border-radius: 12px;
  border: 1px solid black;
  overflow: hidden;
  font-family: Inter;
  position: relative;
`;

const CalendarNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #d9d9d9;
`;

const MonthYearDisplay = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #d9d9d9;
`;

const DayHeader = styled.div`
  padding: 12px;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  color: #555555;
  border-right: 1px solid #d9d9d9;
  position: relative;

  &:last-child {
    border-right: none;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarDay = styled.div<{ isCurrentMonth: boolean }>`
  min-height: 100px;
  padding: 8px;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  opacity: ${(props) => (props.isCurrentMonth ? 1 : 0.5)};

  &:nth-child(7n) {
    border-right: none;
  }
`;

const DayNumber = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  margin-bottom: 6px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CurrentDayMarkerWrapper = (props: any) => {
  const SVGComponent = CurrentDayMarker as any;
  return <SVGComponent {...props} />;
};

const StyledCurrentDayMarker = styled(CurrentDayMarkerWrapper)`
  position: absolute;
  width: 40px;
  height: 47px;
  transform: translate(2px, -2px);
  z-index: 1;
`;

const LessonItem = styled.div<{ isPast: boolean; isActive: boolean }>`
  background-color: ${(props) => (props.isPast ? "#b9ffb8" : "#fce99a")};
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  .details {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: opacity 0.3s ease, max-height 0.3s ease;
  }

  &:hover .details {
    opacity: 1;
    max-height: 100px;
    margin-top: 8px;
  }

  ${(props) =>
    props.isActive &&
    `
    &:hover {
      transform: translateY(-3px);
      filter: brightness(1.05);
      cursor: pointer;
    }
  `}
`;

export default ScheduleCalendar;
