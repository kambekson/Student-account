import React from "react";
import { TeacherItem } from "@/shared/types";

interface TeacherCardProps {
  teacher: TeacherItem;
  onShowToast: (message: string) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onShowToast }) => {
  const isVacation = teacher.status === "В отпуске";

  return (
    <div className="bg-surface border border-outline-variant hover:border-primary/45 rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md group relative overflow-hidden flex flex-col justify-between min-h-[220px]">
      {/* Decorative top strip */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isVacation ? "bg-amber-400" : "bg-primary"
        }`}
      />

      <div>
        {/* Header Section: Avatar, Name, Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {teacher.avatar ? (
              <img 
                src={teacher.avatar} 
                alt={teacher.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-outline-variant group-hover:border-primary/40 transition-colors"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base border-2 border-outline-variant">
                {teacher.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="font-semibold text-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                {teacher.name}
              </h4>
              <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                {teacher.subject}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
              isVacation 
                ? "bg-amber-100 text-amber-800" 
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {teacher.status}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 bg-surface-container-lowest border border-outline-variant/55 p-3 rounded-lg text-xs mb-4">
          <div>
            <p className="text-on-surface-variant text-[10px] uppercase font-semibold tracking-wider">Опыт работы</p>
            <p className="font-bold text-on-surface mt-0.5">{teacher.experience}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-[10px] uppercase font-semibold tracking-wider">Группы</p>
            <p className="font-bold text-on-surface mt-0.5">{teacher.groupsCount} активных</p>
          </div>
        </div>
      </div>

      {/* Footer Section: Contacts */}
      <div className="pt-3 border-t border-outline-variant/50 flex items-center justify-between">
        <div className="flex flex-col text-[11px] text-on-surface-variant gap-0.5">
          <span className="font-medium">{teacher.phone}</span>
          <span className="opacity-80">{teacher.email}</span>
        </div>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => onShowToast(`Звонок преподавателю ${teacher.name} (${teacher.phone})`)}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
            title="Позвонить"
          >
            <span className="material-symbols-outlined text-[18px]">phone</span>
          </button>
          <button
            type="button"
            onClick={() => onShowToast(`Отправка письма на адрес ${teacher.email}`)}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
            title="Написать письмо"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
          </button>
        </div>
      </div>
    </div>
  );
};
