import React from "react";
import { ScheduleItem } from "@/shared/types";

interface TodayScheduleProps {
  schedule: ScheduleItem[];
  onShowToast: (message: string) => void;
}

export const TodaySchedule: React.FC<TodayScheduleProps> = ({ schedule, onShowToast }) => {
  return (
    <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
      <div className="p-4 border-b border-outline-variant flex items-center justify-between">
        <h3 className="font-h3 text-h3 flex items-center gap-2 text-on-surface font-bold">
          <span className="material-symbols-outlined text-primary">event_upcoming</span>
          Расписание на сегодня
        </h3>
        <button
          onClick={() => onShowToast("Календарь расписания откроется скоро")}
          className="text-primary font-label-md hover:underline font-semibold text-sm"
        >
          Открыть календарь
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-bright text-on-surface-variant border-b border-outline-variant font-label-sm uppercase">
            <tr>
              <th className="px-6 py-3 font-semibold text-xs">Время</th>
              <th className="px-6 py-3 font-semibold text-xs">Группа / Урок</th>
              <th className="px-6 py-3 font-semibold text-xs">Преподаватель</th>
              <th className="px-6 py-3 font-semibold text-xs">Класс</th>
              <th className="px-6 py-3 font-semibold text-xs">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {schedule.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-low transition-colors duration-150">
                <td className="px-6 py-4 font-label-md whitespace-nowrap text-sm font-semibold">{item.time}</td>
                <td className="px-6 py-4">
                  <div className="font-body-md font-semibold text-sm text-on-surface">{item.title}</div>
                  <div className="text-xs text-on-surface-variant">{item.groupName}</div>
                </td>
                <td className="px-6 py-4 font-body-md text-sm text-on-surface-variant">{item.teacher}</td>
                <td className="px-6 py-4 font-body-md text-sm text-on-surface-variant">{item.room}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                      item.status === "Идет" ? "bg-emerald-100 text-emerald-800" : "bg-secondary-container text-secondary"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
