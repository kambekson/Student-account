import React from "react";
import { Payment } from "@/shared/types";

interface PaymentDetailModalProps {
  payment: Payment | null;
  onClose: () => void;
  onSendReceipt: () => void;
}

export const PaymentDetailModal: React.FC<PaymentDetailModalProps> = ({
  payment,
  onClose,
  onSendReceipt,
}) => {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-outline-variant rounded-2xl w-full max-w-md shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
          <span className="material-symbols-outlined text-tertiary">receipt_long</span>
          Детали транзакции
        </h3>

        <div className="space-y-3.5 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">Статус:</span>
            <span
              className={`px-2 py-0.5 text-xs font-bold rounded uppercase ${
                payment.status === "Оплачено"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-error-container text-error"
              }`}
            >
              {payment.status}
            </span>
          </div>
          <div className="flex justify-between border-b border-outline-variant pb-2">
            <span className="text-on-surface-variant">Сумма:</span>
            <span className="font-bold text-on-surface">{payment.amount.toLocaleString("ru-RU")} ₸</span>
          </div>
          <div className="flex justify-between border-b border-outline-variant pb-2">
            <span className="text-on-surface-variant">Плательщик (Ученик):</span>
            <span className="font-semibold text-on-surface">{payment.studentName}</span>
          </div>
          <div className="flex justify-between border-b border-outline-variant pb-2">
            <span className="text-on-surface-variant">Дата проведения:</span>
            <span className="text-on-surface font-medium">{payment.date}</span>
          </div>
          <div className="flex justify-between border-b border-outline-variant pb-2">
            <span className="text-on-surface-variant">Тип транзакции:</span>
            <span className="text-on-surface font-medium">Безналичный расчет (Kaspi QR)</span>
          </div>
        </div>

        <div className="flex justify-end pt-4 mt-6 border-t border-outline-variant">
          <button
            onClick={onSendReceipt}
            className="w-full py-2 bg-primary text-on-primary rounded-xl font-semibold text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            Отправить чек
          </button>
        </div>
      </div>
    </div>
  );
};
