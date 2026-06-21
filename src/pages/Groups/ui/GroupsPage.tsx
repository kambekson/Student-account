import React, { useMemo } from "react";
import { GroupItem } from "@/shared/types";
import { GroupRow } from "@/entities/Group/ui/GroupRow";

interface GroupsPageProps {
  groups: GroupItem[];
  searchQuery: string;
  onCreateClick: () => void;
  onShowToast: (message: string) => void;
}

export const GroupsPage: React.FC<GroupsPageProps> = ({
  groups,
  searchQuery,
  onCreateClick,
  onShowToast,
}) => {
  // Filtered groups by search
  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      const match =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return match;
    });
  }, [groups, searchQuery]);

  // Calculations for stats
  const totalGroups = groups.length;
  const avgOccupancy = useMemo(() => {
    if (groups.length === 0) return 0;
    const sum = groups.reduce((acc, curr) => acc + curr.studentsCount / curr.maxStudents, 0);
    return Math.round((sum / groups.length) * 100);
  }, [groups]);

  const freeSeats = useMemo(() => {
    return groups.reduce((acc, curr) => acc + (curr.maxStudents - curr.studentsCount), 0);
  }, [groups]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface tracking-tight font-bold text-3xl">Группы</h2>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Управление учебными коллективами и расписанием</p>
        </div>
        <button
          onClick={onCreateClick}
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-label-md text-sm flex items-center gap-2 transition-all active:scale-[0.98] shadow-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Создать группу
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              diversity_3
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">Всего групп</p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">
              {totalGroups} <span className="text-xs font-normal text-emerald-600 ml-1">активных</span>
            </h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              groups
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">Средняя заполняемость</p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">{avgOccupancy}%</h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-secondary-container/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              event_seat
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">Свободные места</p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">
              {freeSeats} <span className="text-xs font-normal text-on-surface-variant ml-1">места</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Groups Table */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Название группы</th>
                <th className="px-6 py-4 font-semibold">Преподаватель</th>
                <th className="px-6 py-4 font-semibold">Расписание / Каб.</th>
                <th className="px-6 py-4 font-semibold">Наполняемость</th>
                <th className="px-6 py-4 font-semibold">Статус</th>
                <th className="px-6 py-4 w-28 text-right font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant text-sm">
                    Ничего не найдено по вашему запросу.
                  </td>
                </tr>
              ) : (
                filteredGroups.map((group) => (
                  <GroupRow
                    key={group.id}
                    group={group}
                    onView={(id) => onShowToast(`Просмотр группы #${id}`)}
                    onEdit={(id) => onShowToast(`Редактирование группы #${id}`)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low flex items-center justify-between">
          <p className="text-body-sm text-xs text-on-surface-variant font-medium">
            Показано {filteredGroups.length} из {groups.length} групп
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-1.5 border border-outline-variant rounded hover:bg-white transition-colors opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="px-3 py-1 bg-primary text-on-primary font-label-md text-xs rounded font-bold">1</button>
            <button
              disabled
              className="p-1.5 border border-outline-variant rounded hover:bg-white transition-colors opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Help / Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Events Panel */}
        <div className="bg-primary-container/5 border border-primary-container/20 p-6 rounded-xl relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <h4 className="font-h3 text-h3 text-primary mb-3 font-bold">Ближайшие события</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white border border-outline-variant rounded-lg">
                <div className="bg-secondary-container h-10 w-10 flex flex-col items-center justify-center rounded shrink-0">
                  <span className="text-[10px] uppercase font-bold text-on-secondary-container">Окт</span>
                  <span className="text-lg font-bold leading-none text-on-secondary-container">14</span>
                </div>
                <div>
                  <p className="font-body-md text-sm font-bold text-on-surface">Родительское собрание: Группа П-03</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">19:00, Онлайн конференция Zoom</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white border border-outline-variant rounded-lg">
                <div className="bg-primary-container/20 h-10 w-10 flex flex-col items-center justify-center rounded shrink-0">
                  <span className="text-[10px] uppercase font-bold text-primary">Окт</span>
                  <span className="text-lg font-bold leading-none text-primary">16</span>
                </div>
                <div>
                  <p className="font-body-md text-sm font-bold text-on-surface">Итоговое тестирование: Математика</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">16:00, Кабинет 402</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 opacity-[0.03] text-primary pointer-events-none">
            <span className="material-symbols-outlined" style={{ fontSize: "160px" }}>
              event_available
            </span>
          </div>
        </div>

        {/* Weekly Attendance Chart */}
        <div className="bg-tertiary-container/5 border border-tertiary-container/20 p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-h3 text-h3 text-tertiary mb-1 font-bold">Посещаемость групп</h4>
            <p className="text-body-sm text-xs text-on-surface-variant mb-4">Статистика за текущую неделю (7 – 13 Октября)</p>
          </div>
          <div className="flex items-end gap-2 h-32 w-full pt-4">
            {[
              { day: "Пн", fill: "h-[85%]", status: "norm" },
              { day: "Вт", fill: "h-[92%]", status: "norm" },
              { day: "Ср", fill: "h-[78%]", status: "norm" },
              { day: "Чт", fill: "h-[88%]", status: "norm" },
              { day: "Пт", fill: "h-[82%]", status: "norm" },
              { day: "Сб", fill: "h-[45%]", status: "low" },
              { day: "Вс", fill: "h-[5%]", status: "low" },
            ].map((bar, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-sm ${
                    bar.status === "norm" ? "bg-tertiary" : "bg-tertiary/40"
                  } ${bar.fill}`}
                />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">{bar.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-tertiary" />
              <span className="text-label-sm text-xs text-on-surface-variant font-semibold">Выше нормы</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-tertiary/40" />
              <span className="text-label-sm text-xs text-on-surface-variant font-semibold">Ниже нормы</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
