import React from "react";
import { GroupItem } from "@/shared/types";

interface GroupRowProps {
  group: GroupItem;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export const GroupRow: React.FC<GroupRowProps> = ({ group, onView, onEdit }) => {
  const percent = Math.round((group.studentsCount / group.maxStudents) * 100);

  return (
    <tr className="hover:bg-surface-container-lowest transition-colors group">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-body-md text-body-md font-bold text-on-surface">{group.name}</span>
          <span className="text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full w-fit mt-1">
            {group.subject}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            className="h-8 w-8 rounded-full object-cover border border-outline-variant/30"
            alt={group.teacherName}
            src={group.teacherAvatar}
          />
          <span className="font-body-md text-body-md">{group.teacherName}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-on-surface font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {group.schedule}
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm mt-1">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            {group.room}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="w-40">
          <div className="flex justify-between items-center mb-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {group.studentsCount}/{group.maxStudents} студентов
            </span>
            <span className={`font-label-sm text-label-sm font-bold ${percent === 100 ? "text-primary" : ""}`}>
              {percent}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-medium ${
            group.status === "Активна" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${group.status === "Активна" ? "bg-emerald-500" : "bg-amber-500"}`} />
          {group.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onView(group.id)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">visibility</span>
          </button>
          <button
            onClick={() => onEdit(group.id)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
