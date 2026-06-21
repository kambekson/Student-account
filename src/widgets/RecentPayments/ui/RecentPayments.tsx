import React from "react";
import { Payment } from "@/shared/types";
import { PaymentRow } from "@/entities/Payment/ui/PaymentRow";

interface RecentPaymentsProps {
  payments: Payment[];
  onViewDetails: (payment: Payment) => void;
  onShowToast: (message: string) => void;
}

export const RecentPayments: React.FC<RecentPaymentsProps> = ({
  payments,
  onViewDetails,
  onShowToast,
}) => {
  return (
    <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-outline-variant flex items-center justify-between">
        <h3 className="font-h3 text-h3 flex items-center gap-2 text-on-surface font-bold">
          <span className="material-symbols-outlined text-tertiary">receipt_long</span>
          Последние платежи
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onShowToast("Фильтрация платежей")}
            className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
          </button>
          <button
            onClick={() => onShowToast("Скачивание реестра платежей")}
            className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-bright text-on-surface-variant border-b border-outline-variant font-label-sm uppercase">
            <tr>
              <th className="px-6 py-3 font-semibold text-xs">Ученик</th>
              <th className="px-6 py-3 font-semibold text-xs">Сумма</th>
              <th className="px-6 py-3 font-semibold text-xs">Дата</th>
              <th className="px-6 py-3 font-semibold text-xs">Статус</th>
              <th className="px-6 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {payments.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} onViewDetails={onViewDetails} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
