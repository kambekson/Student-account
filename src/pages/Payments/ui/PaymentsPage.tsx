import React, { useState, useMemo } from "react";
import { Payment } from "@/shared/types";
import { PaymentRow } from "@/entities/Payment/ui/PaymentRow";

interface PaymentsPageProps {
  payments: Payment[];
  searchQuery: string;
  onCreateClick: () => void;
  onViewPayment: (payment: Payment) => void;
  onShowToast: (message: string) => void;
}

export const PaymentsPage: React.FC<PaymentsPageProps> = ({
  payments,
  searchQuery,
  onCreateClick,
  onViewPayment,
  onShowToast,
}) => {
  const [statusFilter, setStatusFilter] = useState("Все статусы");

  // Filtering
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchSearch = payment.studentName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = 
        statusFilter === "Все статусы" || 
        payment.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  // Statistics calculations
  const totalAmount = useMemo(() => {
    return payments
      .filter((p) => p.status === "Оплачено")
      .reduce((sum, current) => sum + current.amount, 0);
  }, [payments]);

  const successfulCount = useMemo(() => {
    return payments.filter((p) => p.status === "Оплачено").length;
  }, [payments]);

  const failedCount = useMemo(() => {
    return payments.filter((p) => p.status === "Ошибка").length;
  }, [payments]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface tracking-tight font-bold text-3xl">Финансовый учет</h2>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">
            Контроль транзакций, реестр платежей и финансовая аналитика центра
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-label-md text-sm flex items-center gap-2 transition-all active:scale-[0.98] shadow-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Провести платеж
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance_wallet
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Сумма сборов за месяц
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">
              {totalAmount.toLocaleString("ru-RU")} ₸
            </h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Успешные проводки
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl text-emerald-600">
              {successfulCount} <span className="text-xs font-normal text-on-surface-variant ml-0.5">транзакций</span>
            </h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-error-container/10 flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              sms_failed
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Ошибки транзакций
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl text-error">
              {failedCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Table & Toolbar Container */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-h3 text-h3 text-on-surface font-bold">История транзакций</h3>
            <span className="bg-surface-container px-2.5 py-0.5 rounded-full font-label-sm text-xs text-on-surface-variant font-bold">
              {filteredPayments.length} записей
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-md text-xs text-on-surface-variant focus:ring-primary focus:border-primary"
            >
              <option>Все статусы</option>
              <option>Оплачено</option>
              <option>Ошибка</option>
            </select>
            <button
              onClick={() => onShowToast("Экспорт финансовой ведомости в Excel")}
              className="p-1.5 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              title="Экспорт Excel"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
            </button>
          </div>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5 font-semibold">ID</th>
                <th className="px-6 py-3.5 font-semibold">Плательщик (Ученик)</th>
                <th className="px-6 py-3.5 font-semibold">Сумма</th>
                <th className="px-6 py-3.5 font-semibold">Дата проводки</th>
                <th className="px-6 py-3.5 font-semibold">Статус</th>
                <th className="px-6 py-3.5 w-20 text-right font-semibold">Детали</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant text-sm">
                    Ни одной транзакции по заданным фильтрам не найдено.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <PaymentRow 
                    key={payment.id} 
                    payment={payment} 
                    onViewClick={onViewPayment} 
                    showId
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info & pagination */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low flex items-center justify-between">
          <p className="text-body-sm text-xs text-on-surface-variant font-medium">
            Отображено {filteredPayments.length} из {payments.length} проводок
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-1 border border-outline-variant rounded hover:bg-white transition-colors opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="px-2.5 py-0.5 bg-primary text-on-primary font-label-md text-[11px] rounded font-bold">1</button>
            <button
              disabled
              className="p-1 border border-outline-variant rounded hover:bg-white transition-colors opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
