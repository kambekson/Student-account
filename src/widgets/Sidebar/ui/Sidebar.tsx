import React from "react";

interface SidebarProps {
  activeTab: "dashboard" | "students" | "groups" | "parents" | "schedule" | "payments" | "teachers";
  onChangeTab: (tab: "dashboard" | "students" | "groups" | "parents" | "schedule" | "payments" | "teachers") => void;
  onShowToast: (message: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onChangeTab,
  onShowToast,
}) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-surface border-r border-outline-variant flex flex-col gap-sm p-4 z-40">
      <div className="mb-stack-gap-lg px-2 mt-2">
        <h1 className="font-display text-[22px] font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]">school</span>
          EduCenter Pro
        </h1>
        <p className="font-body-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
          Консоль админа
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto sidebar-scroll">
        <button
          onClick={() => onChangeTab("dashboard")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all text-left ${
            activeTab === "dashboard"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span>Панель управления</span>
        </button>

        <button
          onClick={() => onChangeTab("students")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all text-left ${
            activeTab === "students"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined">group</span>
          <span>Ученики</span>
        </button>

        <button
          onClick={() => onChangeTab("parents")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all text-left ${
            activeTab === "parents"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined">family_restroom</span>
          <span>Родители</span>
        </button>
        <button
          onClick={() => onChangeTab("groups")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all text-left ${
            activeTab === "groups"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined">diversity_3</span>
          <span>Группы</span>
        </button>
        <button
          onClick={() => onChangeTab("schedule")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all text-left ${
            activeTab === "schedule"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined">calendar_month</span>
          <span>Расписание</span>
        </button>
        <button
          onClick={() => onShowToast("Раздел находится в разработке")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left"
        >
          <span className="material-symbols-outlined">how_to_reg</span>
          <span>Посещаемость</span>
        </button>
        <button
          onClick={() => onChangeTab("payments")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all text-left ${
            activeTab === "payments"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined">payments</span>
          <span>Платежи</span>
        </button>
        <button
          onClick={() => onShowToast("Раздел находится в разработке")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left"
        >
          <span className="material-symbols-outlined">card_membership</span>
          <span>Подписки</span>
        </button>
        <button
          onClick={() => onChangeTab("teachers")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all text-left ${
            activeTab === "teachers"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined">school</span>
          <span>Преподаватели</span>
        </button>
        <button
          onClick={() => onShowToast("Раздел находится в разработке")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left"
        >
          <span className="material-symbols-outlined">analytics</span>
          <span>Отчеты</span>
        </button>
      </nav>

      <div className="mt-auto pt-4 border-t border-outline-variant">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-container-low">
          <img
            alt="Администратор"
            className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcmTyW4FrQ4ydUnLYZO11aSS89GEekM3MsMz86oCZbecyc5FzBTURpIhWuZT7YIjVb86Y0yGWIqqCYR9eIIDmYZdjaxZuMXcNwsR0nKv2SuhaFgLfcWDP1pH-95osGaiMhisL7olA4V4w9179JxhFcLkP1Di4P3pvmB8Qnr-N5jsyvfdoRG3EEnUOfHPKcLJjeyMMAFwftGLE6PsSRoc09FPwB1t0VhemhAPW0JcDIvnOBsDxUMJ64ufro8VNSKOgHxWUIJk7QJEAX"
          />
          <div className="overflow-hidden">
            <p className="font-label-md text-label-md truncate font-semibold">Администратор</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Директор</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
