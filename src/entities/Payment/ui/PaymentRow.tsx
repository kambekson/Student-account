import React from "react";
import { Payment } from "@/shared/types";

interface PaymentRowProps {
  payment: Payment;
  onViewClick?: (payment: Payment) => void;
  onViewDetails?: (payment: Payment) => void;
  showId?: boolean;
}

export const PaymentRow: React.FC<PaymentRowProps> = ({ 
  payment, 
  onViewClick, 
  onViewDetails,
  showId = false 
}) => {
  const handleClick = () => {
    if (onViewClick) onViewClick(payment);
    else if (onViewDetails) onViewDetails(payment);
  };

  return (
    <tr 
      onClick={handleClick}
      className="data-table-row transition-all duration-150 cursor-pointer hover:bg-surface-container-low group active:scale-[0.995]"
    >
      {showId && (
        <td className="px-6 py-3.5">
          <span className="font-mono text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">
            #{payment.id.toUpperCase()}
          </span>
        </td>
      )}
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            {payment.avatarInitials || payment.studentName.charAt(0)}
          </div>
          <span className="font-body-md text-sm text-on-surface font-semibold">
            {payment.studentName}
          </span>
        </div>
      </td>
      <td className="px-6 py-3.5">
        <span className="font-bold text-sm text-on-surface">
          {payment.amount.toLocaleString("ru-RU")} ₸
        </span>
      </td>
      <td className="px-6 py-3.5">
        <span className="text-xs text-on-surface-variant font-medium">
          {payment.date}
        </span>
      </td>
      <td className="px-6 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            payment.status === "Оплачено"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-error-container text-error"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${payment.status === "Оплачено" ? "bg-emerald-500" : "bg-error"}`} />
          {payment.status}
        </span>
      </td>
      <td className="px-6 py-3.5 text-right">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
          title="Подробнее"
        >
          <span className="material-symbols-outlined text-[18px]">visibility</span>
        </button>
      </td>
    </tr>
  );
};
