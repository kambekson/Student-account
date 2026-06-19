import { StudentSchedule } from "@/entities/ScheduledLesson";
import { useCallback, useMemo, useState } from "react";

export function useCalendar(initialDate = new Date()) {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);

    // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
    let dayOfWeek = firstDay.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Add days from next month
    const nextMonthDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  return { currentDate, calendarDays, goToPreviousMonth, goToNextMonth };
}

export function useScheduleData(schedules: StudentSchedule[]) {
  return useMemo(() => {
    const grouped: Record<string, StudentSchedule[]> = {};

    schedules.forEach((schedule) => {
      const date = new Date(schedule.scheduledLesson.startAt);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(schedule);
    });

    return {
      getSchedulesForDay: (date: Date) => {
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return grouped[dateKey] || [];
      },
    };
  }, [schedules]);
}
