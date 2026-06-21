import React, { useState, useMemo } from "react";
import { ParentItem } from "@/shared/types";
import { ParentRow } from "@/entities/Parent/ui/ParentRow";

interface ParentsPageProps {
  parents: ParentItem[];
  searchQuery: string;
  onCreateClick: () => void;
  onShowToast: (message: string) => void;
}

export const ParentsPage: React.FC<ParentsPageProps> = ({
  parents,
  searchQuery,
  onCreateClick,
  onShowToast,
}) => {
  const [statusFilter, setStatusFilter] = useState("Все статусы");

  // Filtering logic
  const filteredParents = useMemo(() => {
    return parents.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === "Все статусы" ||
        (statusFilter === "Активна подписка" && p.activeSub) ||
        (statusFilter === "Просрочена" && !p.activeSub) ||
        (statusFilter === "С задолженностью" && p.balance > 0);

      return matchSearch && matchStatus;
    });
  }, [parents, searchQuery, statusFilter]);

  // Calculations for stats
  const totalContacts = parents.length;
  const activeSubsCount = parents.filter((p) => p.activeSub).length;
  const totalDebts = parents.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface tracking-tight font-bold text-3xl">Родители</h2>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">
            Контактная база и взаимосвязь с законными представителями
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-label-md text-sm flex items-center gap-2 transition-all active:scale-[0.98] shadow-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Добавить родителя
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              family_restroom
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Всего представителей
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">
              {totalContacts} <span className="text-xs font-normal text-emerald-600 ml-1">контактов</span>
            </h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Активные подписки детей
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl">{activeSubsCount}</h3>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant p-5 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-error-container/10 flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-sm text-xs uppercase tracking-wider font-semibold">
              Общая задолженность
            </p>
            <h3 className="font-h2 text-h2 text-on-surface font-bold text-2xl text-error">
              {totalDebts.toLocaleString("ru-RU")} ₽
            </h3>
          </div>
        </div>
      </div>

      {/* Parents Directory Table */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-h3 text-h3 text-on-surface font-bold">База представителей</h3>
            <span className="bg-surface-container px-2.5 py-0.5 rounded-full font-label-sm text-xs text-on-surface-variant font-bold">
              {filteredParents.length} Всего
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-md text-sm text-on-surface-variant focus:ring-primary focus:border-primary"
            >
              <option>Все статусы</option>
              <option>Активна подписка</option>
              <option>Просрочена</option>
              <option>С задолженностью</option>
            </select>
            <button
              onClick={() => onShowToast("Экспорт базы родителей в Excel")}
              className="p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">ФИО Родителя</th>
                <th className="px-6 py-4 font-semibold">Ребенок (Ученик)</th>
                <th className="px-6 py-4 font-semibold">Контакты</th>
                <th className="px-6 py-4 font-semibold">Статус подписки</th>
                <th className="px-6 py-4 text-right font-semibold">Баланс</th>
                <th className="px-6 py-4 w-28 text-right font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {filteredParents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant text-sm">
                    Ничего не найдено по вашему запросу.
                  </td>
                </tr>
              ) : (
                filteredParents.map((parent) => (
                  <ParentRow key={parent.id} parent={parent} onShowToast={onShowToast} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low flex items-center justify-between">
          <p className="text-body-sm text-xs text-on-surface-variant font-medium">
            Показано {filteredParents.length} из {parents.length} записей
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-1.5 border border-outline-variant rounded hover:bg-white transition-colors opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="px-3 py-1 bg-primary text-on-primary font-label-md text-xs rounded font-bold">1</button>
            <button
              disabled
              className="p-1.5 border border-outline-variant rounded hover:bg-white transition-colors opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Insights Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parent Requests Feed */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
          <h4 className="font-h3 text-h3 text-on-surface mb-4 font-bold">Обращения родителей</h4>
          <div className="space-y-3">
            {[
              {
                parent: "Элеонора Стерлинг",
                text: "Спрашивала про расписание группы по высшей математике на следующую субботу.",
                time: "10 минут назад",
                icon: "chat_bubble",
              },
              {
                parent: "Давид Окафор",
                text: "Просит выписать Kaspi QR-код для повторной оплаты подписки за Амару.",
                time: "2 часа назад",
                icon: "payments",
              },
              {
                parent: "Сара Вэнс",
                text: "Оставила комментарий по пропуску Лиама: улетели на обследование.",
                time: "1 день назад",
                icon: "description",
              },
            ].map((req, i) => (
              <div key={i} className="flex gap-3 p-3 bg-surface-container-low border border-outline-variant/65 rounded-xl">
                <span className="material-symbols-outlined text-primary mt-1">{req.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-body-md text-sm font-bold text-on-surface">{req.parent}</p>
                    <span className="text-[10px] text-on-surface-variant font-semibold">{req.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{req.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Bulk Actions */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-h3 text-h3 text-on-surface mb-3 font-bold">Быстрые рассылки</h4>
            <p className="text-body-sm text-xs text-on-surface-variant mb-5">
              Автоматические оповещения для должников и важных объявлений.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => onShowToast("Рассылка СМС должникам запущена")}
                className="w-full flex items-center gap-2 p-2.5 hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant text-left text-xs font-semibold text-on-surface"
              >
                <span className="material-symbols-outlined text-error">campaign</span>
                Напомнить должникам (баланс &gt; 10 000 ₽)
              </button>
              <button
                onClick={() => onShowToast("Уведомление об изменениях расписания отправлено")}
                className="w-full flex items-center gap-2 p-2.5 hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant text-left text-xs font-semibold text-on-surface"
              >
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                Разослать новость группам на Сб/Вс
              </button>
            </div>
          </div>

          <button
            onClick={() => onShowToast("Создать индивидуальный шаблон оповещения")}
            className="w-full mt-6 py-2 bg-primary/10 hover:bg-primary/15 transition-all rounded-lg font-label-md text-xs font-bold text-primary text-center"
          >
            Создать рассылку
          </button>
        </div>
      </div>
    </div>
  );
};
