import React, { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: "dashboard" | "students" | "groups" | "parents" | "schedule" | "payments" | "teachers";
  onAddClick: () => void;
  onShowToast: (message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onAddClick,
  onShowToast,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-[64px] flex items-center justify-between px-6 bg-surface border-b border-outline-variant sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-on-surface-variant/60"
            placeholder={
              activeTab === "students" || activeTab === "parents"
                ? "Поиск учеников или родителей..."
                : activeTab === "schedule"
                ? "Поиск занятий, групп или учителей..."
                : activeTab === "payments"
                ? "Поиск платежей по ученику..."
                : activeTab === "teachers"
                ? "Поиск преподавателей по ФИО..."
                : "Поиск по панели управления..."
            }
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-[0.98] transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Добавить
        </button>
        <div className="h-8 w-[1px] bg-outline-variant mx-1"></div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`p-2 hover:bg-surface-container-low rounded-full transition-colors relative ${
              notificationsOpen ? "bg-surface-container-low" : ""
            }`}
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-outline-variant rounded-xl shadow-xl z-50 p-4">
              <h4 className="font-semibold text-sm mb-3">Уведомления</h4>
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-error-container/20 border border-error-container/40 text-xs">
                  <p className="font-semibold text-on-error-container">Маркус Уэбб</p>
                  <p className="text-on-surface-variant mt-0.5">Срок действия подписки истекает через 2 дня.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low text-xs">
                  <p className="font-semibold">Хлоя Чжан</p>
                  <p className="text-on-surface-variant mt-0.5">Ошибка при обработке ежемесячного платежа.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNotificationsOpen(false);
                  onShowToast("Все уведомления прочитаны");
                }}
                className="w-full text-center text-xs text-primary font-semibold mt-4 pt-2 border-t border-outline-variant hover:underline"
              >
                Отметить все как прочитанные
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => onShowToast("Справочный центр готовится к запуску")}
          className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-outline-variant/65">
          <div className="text-right">
            <p className="font-label-md text-label-md text-on-surface leading-tight font-semibold">Администратор</p>
            <p className="text-[11px] text-on-surface-variant">Модератор</p>
          </div>
          <img
            className="w-10 h-10 rounded-full border border-outline-variant object-cover"
            alt="Админ"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcbp7rzBBh_FU81PA12ndHau7OGNz_tKEBm2klt4seDFqOkqbOdK-ovoZKno_RAbMuXIFAebFANC4btxU0Ge2jxGwJ2ue7htOsbjDvqpkfdjS8bxQwS9uBXvaytPrMWZJMGJJVZpQo_i_I-dT8WPmO2-Sv4ntiymVvvIGtmsWj1-xTv9u2NslQkkQFX0EJxJZhfRYf1_CW_Qyum86puYTC5W3b4cR7SDjhwGCRz1T7YFH8qG05VLhhg7cyr_hEmh8D0FmJBG4jhgNE"
          />
        </div>
      </div>
    </header>
  );
};
