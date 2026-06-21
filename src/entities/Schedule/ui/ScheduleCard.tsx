import React from "react";
import { ScheduleItem } from "@/shared/types";

interface ScheduleCardProps {
  item: ScheduleItem;
  onShowToast?: (message: string) => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ item, onShowToast }) => {
  // Determine status styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Идет":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
          badgeBg: "bg-emerald-500",
          label: "Идет сейчас",
          pulse: true,
        };
      case "Завершено":
        return {
          bg: "bg-slate-100 border-slate-200 text-slate-500 dark:bg-surface-container-high dark:border-outline-variant/30 dark:text-on-surface-variant",
          badgeBg: "bg-slate-400",
          label: "Завершено",
          pulse: false,
        };
      default:
        return {
          bg: "bg-amber-500/10 border-amber-500/30 text-amber-600",
          badgeBg: "bg-amber-500",
          label: "Ожидается",
          pulse: false,
        };
    }
  };

  const statusStyle = getStatusStyles(item.status);

  return (
    <div className="bg-surface border border-outline-variant hover:border-primary/40 rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md group relative overflow-hidden flex flex-col justify-between min-h-[160px] cursor-pointer">
      {/* Decorative left bar matching status */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          item.status === "Идет" 
            ? "bg-emerald-500" 
            : item.status === "Завершено" 
            ? "bg-slate-400" 
            : "bg-amber-500"
        }`}
      />

      <div>
        {/* Header: Time & Status Badge */}
        <div className="flex items-center justify-between mb-3 pl-1">
          <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-2.5 py-1 rounded-lg">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>{item.time}</span>
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${statusStyle.bg}`}>
            {statusStyle.pulse && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            {!statusStyle.pulse && (
              <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.badgeBg}`} />
            )}
            <span>{statusStyle.label}</span>
          </div>
        </div>

        {/* Title and Group */}
        <div className="pl-1">
          <h4 className="font-semibold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-1">
            {item.title}
          </h4>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">diversity_3</span>
            {item.groupName}
          </p>
        </div>
      </div>

      {/* Footer: Teacher & Room */}
      <div className="mt-5 pt-3 border-t border-outline-variant/50 flex items-center justify-between pl-1">
        <div className="flex items-center gap-2">
          {item.teacherAvatar ? (
            <img 
              src={item.teacherAvatar} 
              alt={item.teacher} 
              className="w-7 h-7 rounded-full object-cover border border-outline-variant/30"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              {item.teacher.charAt(0)}
            </div>
          )}
          <span className="text-xs font-semibold text-on-surface/90 line-clamp-1 max-w-[110px] md:max-w-[130px]">
            {item.teacher}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-on-surface-variant font-medium bg-surface-container-low px-2 py-1 rounded-lg">
          <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
          <span>{item.room}</span>
        </div>
      </div>
    </div>
  );
};
