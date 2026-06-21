import React, { useState, useMemo } from "react";
import { ScheduleItem } from "@/shared/types";
import { ScheduleCard } from "@/entities/Schedule/ui/ScheduleCard";

interface SchedulePageProps {
  schedule: ScheduleItem[];
  onCreateClick: () => void;
  onShowToast: (message: string) => void;
}

type DayType = "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс";

export const SchedulePage: React.FC<SchedulePageProps> = ({
  schedule,
  onCreateClick,
  onShowToast,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayType>("Пн");
  const [roomFilter, setRoomFilter] = useState("Все кабинеты");
  const [searchQuery, setSearchQuery] = useState("");

  // Get list of unique rooms for filter
  const uniqueRooms = useMemo(() => {
    const rooms = schedule.map((item) => item.room);
    return ["Все кабинеты", ...Array.from(new Set(rooms))];
  }, [schedule]);

  // Filtering logic
  const filteredSchedule = useMemo(() => {
    return schedule.filter((item) => {
      const matchDay = item.dayOfWeek === selectedDay;
      
      const matchRoom = 
        roomFilter === "Все кабинеты" || 
        item.room === roomFilter;

      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.teacher.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDay && matchRoom && matchSearch;
    });
  }, [schedule, selectedDay, roomFilter, searchQuery]);

  // Calculations for stats
  const totalWeeklyLessons = schedule.length;
  
  const todayActiveLessonsCount = useMemo(() => {
    return schedule.filter((item) => item.dayOfWeek === selectedDay).length;
  }, [schedule, selectedDay]);

  const uniqueRoomsTodayCount = useMemo(() => {
    const activeToday = schedule.filter((item) => item.dayOfWeek === selectedDay);
    const rooms = activeToday.map((item) => item.room);
    return new Set(rooms).size;
  }, [schedule, selectedDay]);

  const daysList: { key: DayType; name: string }[] = [
    { key: "Пн", name: "Понедельник" },
    { key: "Вт", name: "Вторник" },
    { key: "Ср", name: "Среда" },
    { key: "Чт", name: "Четверг" },
    { key: "Пт", name: "Пятница" },
    { key: "Сб", name: "Суббота" },
    { key: "Вс", name: "Воскресенье" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface tracking-tight font-bold text-3xl">Расписание занятий</h2>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">
            Сетка занятий, занятость учебных кабинетов и нагрузка преподавателей
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-label-md text-sm flex items-center gap-2 transition-all active:scale-[0.98] shadow-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Добавить занятие
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              calendar_month
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Занятий за неделю
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">
              {totalWeeklyLessons} <span className="text-xs font-normal text-emerald-600 ml-1">уроков</span>
            </h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              meeting_room
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Кабинетов задействовано
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">
              {uniqueRoomsTodayCount} <span className="text-xs font-normal text-on-surface-variant ml-0.5">в этот день</span>
            </h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-error-container/10 flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              alarm
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Всего уроков в выбранный день
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">
              {todayActiveLessonsCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Weekday Selector Tabs */}
      <div className="bg-surface border border-outline-variant rounded-xl p-2 shadow-sm flex flex-wrap gap-1">
        {daysList.map((day) => (
          <button
            key={day.key}
            onClick={() => setSelectedDay(day.key)}
            className={`flex-1 min-w-[70px] py-3.5 rounded-lg font-semibold text-xs transition-all flex flex-col items-center gap-1 ${
              selectedDay === day.key
                ? "bg-primary text-on-primary shadow-md scale-[1.02]"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            <span className="text-sm font-bold">{day.key}</span>
            <span className="text-[10px] opacity-80 uppercase font-medium max-md:hidden">{day.name.slice(0, 3)}</span>
          </button>
        ))}
      </div>

      {/* Filter and search bar */}
      <div className="bg-surface border border-outline-variant rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-1.5 pl-9 pr-4 font-label-md text-xs focus:outline-none focus:ring-2 focus:ring-primary placeholder-on-surface-variant/60"
            placeholder="Поиск по уроку, группе или преподавателю..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Classroom selector filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant font-medium">Фильтр кабинета:</span>
          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-md text-xs text-on-surface-variant focus:ring-primary focus:ring-outline-variant"
          >
            {uniqueRooms.map((room) => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
          <button
            onClick={() => onShowToast("Экспорт расписания на выбранный день")}
            className="p-1.5 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            title="Скачать PDF расписания"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
          </button>
        </div>
      </div>

      {/* Grid displaying the day's lessons */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col justify-center">
        {filteredSchedule.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center max-w-md mx-auto">
            <span className="material-symbols-outlined text-outline text-[48px] mb-3">
              calendar_today
            </span>
            <h4 className="font-bold text-base text-on-surface">Нет занятий</h4>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              На этот день ({daysList.find((d) => d.key === selectedDay)?.name}) не найдено ни одного урока. Попробуйте изменить фильтры или добавьте новое занятие.
            </p>
            <button
              onClick={onCreateClick}
              className="mt-5 bg-primary/10 text-primary font-bold text-xs px-4 py-2 rounded-xl hover:bg-primary/15 transition-all"
            >
              Создать первое занятие
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 self-start w-full">
            {filteredSchedule.map((item) => (
              <ScheduleCard key={item.id} item={item} onShowToast={onShowToast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
