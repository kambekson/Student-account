import React from "react";
import { Student, TaskItem } from "@/shared/types";
import { StudentRow } from "@/entities/Student/ui/StudentRow";
import { TaskRow } from "@/entities/Task/ui/TaskRow";

interface StudentsPageProps {
  filteredStudents: Student[];
  paginatedStudents: Student[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  selectedGroup: string;
  onGroupChange: (group: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onShowToast: (message: string) => void;
}

export const StudentsPage: React.FC<StudentsPageProps> = ({
  filteredStudents,
  paginatedStudents,
  totalPages,
  currentPage,
  onPageChange,
  selectedGroup,
  onGroupChange,
  selectedStatus,
  onStatusChange,
  tasks,
  onToggleTask,
  onShowToast,
}) => {
  const riskCount = filteredStudents.filter(
    (s) => s.subscriptionStatus === "Просрочена" || s.lastVisitStatus === "Прогул (3+ дня)"
  ).length;

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredStudents.length);

  return (
    <div className="space-y-6">
      {/* Stats Headers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Ср. посещаемость</p>
            <h2 className="font-h1 text-h1 text-on-surface font-bold text-3xl">94.2%</h2>
            <div className="flex items-center gap-1 text-emerald-600 mt-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="font-label-sm text-xs font-semibold">+2.4% с прошлого месяца</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined text-[26px]">calendar_today</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Новые ученики</p>
            <h2 className="font-h1 text-h1 text-on-surface font-bold text-3xl">28</h2>
            <div className="flex items-center gap-1 text-emerald-600 mt-1">
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span className="font-label-sm text-xs font-semibold">Сезон active-роста</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined text-[26px]">group_add</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">В зоне риска</p>
            <h2 className="font-h1 text-h1 text-on-surface font-bold text-3xl">{riskCount}</h2>
            <div className="flex items-center gap-1 text-error mt-1">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span className="font-label-sm text-xs font-bold">Требуют внимания</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-error-container rounded-lg flex items-center justify-center text-error shadow-inner">
            <span className="material-symbols-outlined text-[26px]">person_alert</span>
          </div>
        </div>
      </div>

      {/* Directory Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-h3 text-h3 text-on-surface font-bold">Реестр учеников</h3>
            <span className="bg-surface-container px-2.5 py-0.5 rounded-full font-label-sm text-xs text-on-surface-variant font-bold">
              {filteredStudents.length} Всего
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedGroup}
              onChange={(e) => onGroupChange(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-md text-sm text-on-surface-variant focus:ring-primary focus:border-primary"
            >
              <option>Все группы</option>
              <option>Основы математики</option>
              <option>Творческое письмо A</option>
              <option>Продвинутая физика</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-md text-sm text-on-surface-variant focus:ring-primary focus:border-primary"
            >
              <option>Все статусы</option>
              <option>Активен</option>
              <option>Истекает</option>
              <option>Просрочен</option>
            </select>

            <button
              onClick={() => onShowToast("Дополнительные фильтры будут добавлены в следующей итерации")}
              className="flex items-center gap-2 border border-outline-variant bg-surface px-3 py-1.5 rounded-lg font-label-md text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Фильтры
            </button>
            <button
              onClick={() => onShowToast("Экспорт реестра учеников в CSV")}
              className="p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-bright border-b border-outline-variant font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Имя ученика</th>
                <th className="px-6 py-3 font-semibold">Имя родителя</th>
                <th className="px-6 py-3 font-semibold">Группы</th>
                <th className="px-6 py-3 font-semibold text-center">Последнее посещение</th>
                <th className="px-6 py-3 font-semibold">Подписка</th>
                <th className="px-6 py-3 font-semibold text-right">Баланс</th>
                <th className="px-6 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant">
                    Ничего не найдено по вашему запросу.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    onSelectParent={(parent) => onShowToast(`Информация о родителе: ${parent}`)}
                    onShowActions={(name) => onShowToast(`Действия для ${name}`)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Control */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-bright">
            <p className="font-body-sm text-xs text-on-surface-variant">
              Показано с {startIndex} по {endIndex} из {filteredStudents.length} записей
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40"
              >
                Назад
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => onPageChange(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === i + 1 ? "bg-primary text-on-primary shadow-sm" : "hover:bg-surface-container-high"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40"
              >
                Вперед
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Attendance Trend Chart */}
        <div className="lg:col-span-3 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-h3 text-h3 text-on-surface font-bold">Тренды посещаемости</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 font-label-sm text-xs text-on-surface-variant font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Присутствие
              </span>
              <span className="flex items-center gap-1.5 font-label-sm text-xs text-on-surface-variant font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-error" />
                Пропуски
              </span>
            </div>
          </div>
          <div className="h-48 w-full flex items-end justify-between gap-3 px-2 pt-6">
            {[
              { day: "Пн", fill: "h-[85%]", attend: "90%" },
              { day: "Вт", fill: "h-[70%]", attend: "85%" },
              { day: "Ср", fill: "h-[90%]", attend: "92%" },
              { day: "Чт", fill: "h-[80%]", attend: "88%" },
              { day: "Пт", fill: "h-[95%]", attend: "96%" },
              { day: "Сб", fill: "h-[60%]", attend: "75%" },
              { day: "Вс", fill: "h-[85%]", attend: "90%" },
            ].map((item, index) => (
              <div
                key={index}
                className="w-full bg-primary/10 rounded-t-sm relative group flex flex-col justify-end"
                style={{ height: "100%" }}
              >
                <div
                  className={`absolute bottom-0 w-full bg-primary rounded-t-sm ${item.fill} transition-all duration-300 group-hover:brightness-110 shadow-sm`}
                />
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {item.attend}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => (
              <span key={i} className="font-label-sm text-xs text-on-surface-variant font-semibold">
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Pending Tasks Panel */}
        <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-h3 text-h3 text-on-surface font-bold mb-4">Ожидающие задачи</h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} onToggle={onToggleTask} />
              ))}
            </div>
          </div>

          <button
            onClick={() => onShowToast("Открытие полного списка задач")}
            className="w-full mt-6 text-center py-2 border border-outline-variant rounded-lg font-label-md text-xs font-bold text-primary hover:bg-surface-container-low transition-all"
          >
            Все задачи ({tasks.filter((t) => !t.completed).length})
          </button>
        </div>
      </div>
    </div>
  );
};
