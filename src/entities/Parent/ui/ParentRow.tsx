import React from "react";
import { ParentItem } from "@/shared/types";

interface ParentRowProps {
  parent: ParentItem;
  onShowToast: (message: string) => void;
}

export const ParentRow: React.FC<ParentRowProps> = ({ parent, onShowToast }) => {
  return (
    <tr className="data-table-row transition-all duration-150 cursor-pointer group active:scale-[0.995]">
      <td className="px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
            alt={parent.name}
            src={parent.avatar}
          />
          <div>
            <p className="font-body-md text-sm text-on-surface font-semibold">{parent.name}</p>
            <p className="text-xs text-on-surface-variant">ID: {parent.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-3">
        <div className="flex flex-col">
          <p className="font-body-md text-sm font-semibold">{parent.childName}</p>
          <p className="text-xs text-on-surface-variant">ID: {parent.childId}</p>
        </div>
      </td>
      <td className="px-6 py-3">
        <div className="flex flex-col text-sm">
          <span className="font-medium text-on-surface">{parent.phone}</span>
          <span className="text-xs text-on-surface-variant">{parent.email}</span>
        </div>
      </td>
      <td className="px-6 py-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            parent.activeSub ? "bg-emerald-100 text-emerald-800" : "bg-error-container text-error"
          }`}
        >
          {parent.activeSub ? "Активна" : "Просрочена"}
        </span>
      </td>
      <td className="px-6 py-3 text-right">
        <p className={`font-body-md text-sm font-bold ${parent.balance > 10000 ? "text-error" : "text-on-surface"}`}>
          {parent.balance.toLocaleString("ru-RU")} ₽
        </p>
      </td>
      <td className="px-6 py-3 text-right">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShowToast(`Отправка счета родителю ${parent.name}`);
            }}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
            title="Отправить счет"
          >
            <span className="material-symbols-outlined text-[20px]">payments</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShowToast(`Отправка WhatsApp-сообщения родителю ${parent.name}`);
            }}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
            title="Написать в WhatsApp"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
