import React from "react";

type TabType = "dashboard" | "students" | "groups" | "parents" | "schedule" | "payments" | "teachers";

interface SidebarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  onShowToast: (message: string) => void;
}

interface NavItem {
  id?: TabType;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Панель управления", icon: "dashboard" },
  { id: "students", label: "Ученики", icon: "group" },
  { id: "parents", label: "Родители", icon: "family_restroom" },
  { id: "groups", label: "Группы", icon: "diversity_3" },
  { id: "schedule", label: "Расписание", icon: "calendar_month" },
  { label: "Посещаемость", icon: "how_to_reg" },
  { id: "payments", label: "Платежи", icon: "payments" },
  { label: "Подписки", icon: "card_membership" },
  { id: "teachers", label: "Преподаватели", icon: "school" },
  { label: "Отчеты", icon: "analytics" },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onChangeTab,
  onShowToast,
}) => {
  return (
    <aside
      aria-label="Боковая панель навигации"
      className="fixed left-0 top-0 h-screen w-[260px] bg-surface border-r border-outline-variant flex flex-col gap-sm p-4 z-40"
    >
      <div className="mb-stack-gap-lg px-2 mt-2">
        <h1 className="font-display text-[22px] font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]" aria-hidden="true">
            school
          </span>
          EduCenter Pro
        </h1>
        <p className="font-body-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
          Консоль админа
        </p>
      </div>

      <nav aria-label="Основная навигация" className="flex-1 flex flex-col gap-1 overflow-y-auto sidebar-scroll">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id ? activeTab === item.id : false;
          return (
            <button
              key={item.label}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                if (item.id) {
                  onChangeTab(item.id);
                } else {
                  onShowToast("Раздел находится в разработке");
                }
              }}
              className={`flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-lg font-body-md text-body-md text-left transition-all duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 motion-reduce:transition-none ${
                isActive
                  ? "bg-primary-container text-on-primary-container font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
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
