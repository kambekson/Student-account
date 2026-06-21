import React from "react";
import { Student } from "@/shared/types";

interface StudentRowProps {
  student: Student;
  onSelectParent: (parentName: string) => void;
  onShowActions: (studentName: string) => void;
}

export const StudentRow: React.FC<StudentRowProps> = ({
  student,
  onSelectParent,
  onShowActions,
}) => {
  const isPresent = student.lastVisitStatus.includes("Присутствова") || student.lastVisitStatus === "Присутствовал";

  return (
    <tr className="data-table-row transition-all duration-150 cursor-pointer group active:scale-[0.995]">
      <td className="px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
            alt={student.name}
            src={student.avatar}
          />
          <div>
            <p className="font-body-md text-sm text-on-surface font-semibold">{student.name}</p>
            <p className="text-xs text-on-surface-variant">ID: {student.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectParent(student.parentName);
          }}
          className="text-primary hover:underline font-body-md text-sm text-left"
        >
          {student.parentName}
        </button>
      </td>
      <td className="px-6 py-3">
        <div className="flex flex-wrap gap-1">
          {student.groups.map((grp, i) => (
            <span
              key={i}
              className="bg-surface-container px-2 py-0.5 rounded font-label-sm text-[10px] text-on-surface-variant font-medium"
            >
              {grp}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-3 text-center">
        <p className="font-body-md text-sm text-on-surface font-medium">{student.lastVisitDate}</p>
        <p className={`font-label-sm text-xs font-semibold ${isPresent ? "text-emerald-600" : "text-error"}`}>
          {student.lastVisitStatus}
        </p>
      </td>
      <td className="px-6 py-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            student.subscriptionStatus === "Активна"
              ? "bg-emerald-100 text-emerald-800"
              : student.subscriptionStatus.startsWith("Истекает")
              ? "bg-amber-100 text-amber-800"
              : "bg-error-container text-error"
          }`}
        >
          {student.subscriptionStatus}
        </span>
      </td>
      <td className="px-6 py-3 text-right">
        <p className={`font-body-md text-sm font-bold ${student.balance > 10000 ? "text-error" : "text-on-surface"}`}>
          {student.balance.toLocaleString("ru-RU")} ₽
        </p>
      </td>
      <td className="px-6 py-3 text-right">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShowActions(student.name);
          }}
          className="p-1 opacity-0 group-hover:opacity-100 text-on-surface-variant hover:bg-surface-container rounded-lg transition-all"
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </td>
    </tr>
  );
};
