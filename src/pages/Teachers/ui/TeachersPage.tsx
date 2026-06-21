import React, { useState, useMemo } from "react";
import { TeacherItem } from "@/shared/types";
import { TeacherCard } from "@/entities/Teacher/ui/TeacherCard";

interface TeachersPageProps {
  teachers: TeacherItem[];
  searchQuery: string;
  onCreateClick: () => void;
  onShowToast: (message: string) => void;
}

export const TeachersPage: React.FC<TeachersPageProps> = ({
  teachers,
  searchQuery,
  onCreateClick,
  onShowToast,
}) => {
  const [subjectFilter, setSubjectFilter] = useState("Все направления");

  // Get list of unique subjects for filter
  const uniqueSubjects = useMemo(() => {
    const subjects = teachers.map((t) => t.subject);
    return ["Все направления", ...Array.from(new Set(subjects))];
  }, [teachers]);

  // Filtering logic
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchSubject = 
        subjectFilter === "Все направления" || 
        teacher.subject === subjectFilter;

      return matchSearch && matchSubject;
    });
  }, [teachers, searchQuery, subjectFilter]);

  // Statistics
  const totalTeachers = teachers.length;
  const activeCount = teachers.filter((t) => t.status === "Активен").length;
  const vacationCount = teachers.filter((t) => t.status === "В отпуске").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface tracking-tight font-bold text-3xl">Преподавательский состав</h2>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">
            Управление штатом преподавателей, координация нагрузок и расписания
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-label-md text-sm flex items-center gap-2 transition-all active:scale-[0.98] shadow-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Добавить преподавателя
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              badge
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Преподавателей в штате
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">
              {totalTeachers} <span className="text-xs font-normal text-emerald-600 ml-1">специалистов</span>
            </h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              supervised_user_circle
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Активно ведут уроки
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl text-emerald-600">
              {activeCount}
            </h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              bed
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              В отпуске / На замене
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl text-amber-600">
              {vacationCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Toolbar & Filter Bar */}
      <div className="bg-surface border border-outline-variant rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h3 className="font-h3 text-h3 text-on-surface font-bold text-sm">База сотрудников</h3>
          <span className="bg-surface-container px-2.5 py-0.5 rounded-full font-label-sm text-xs text-on-surface-variant font-bold">
            {filteredTeachers.length} найдено
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant font-medium">Специализация:</span>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-md text-xs text-on-surface-variant focus:ring-primary focus:border-primary"
          >
            {uniqueSubjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col justify-center">
        {filteredTeachers.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center max-w-md mx-auto">
            <span className="material-symbols-outlined text-outline text-[48px] mb-3">
              person_off
            </span>
            <h4 className="font-bold text-base text-on-surface">Преподаватели не найдены</h4>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              Не найдено сотрудников по заданным критериям фильтрации или поиска.
            </p>
            <button
              onClick={onCreateClick}
              className="mt-5 bg-primary/10 text-primary font-bold text-xs px-4 py-2 rounded-xl hover:bg-primary/15 transition-all"
            >
              Добавить преподавателя
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 self-start w-full">
            {filteredTeachers.map((teacher) => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                onShowToast={onShowToast} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
