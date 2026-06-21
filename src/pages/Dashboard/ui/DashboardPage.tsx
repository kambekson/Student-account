import React from "react";
import { Student, Payment, ScheduleItem } from "@/shared/types";
import { TodaySchedule } from "@/widgets/TodaySchedule/ui/TodaySchedule";
import { RecentPayments } from "@/widgets/RecentPayments/ui/RecentPayments";
import { NewRegistrations } from "@/widgets/NewRegistrations/ui/NewRegistrations";

interface DashboardPageProps {
  students: Student[];
  payments: Payment[];
  schedule: ScheduleItem[];
  onViewPayment: (payment: Payment) => void;
  onRenewSubscription: (name: string) => void;
  onShowToast: (message: string) => void;
  onNavigateToStudents: (searchQuery: string) => void;
  onChangeTab: (tab: "dashboard" | "students") => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  students,
  payments,
  schedule,
  onViewPayment,
  onRenewSubscription,
  onShowToast,
  onNavigateToStudents,
  onChangeTab,
}) => {
  const overdueCount = students.filter((s) => s.subscriptionStatus === "Просрочена").length;

  return (
    <div className="space-y-6">
      {/* Bento Widgets Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Widget: Total Students */}
        <div
          onClick={() => onChangeTab("students")}
          className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg group-hover:scale-110 transition-transform">
              group
            </span>
            <span className="text-emerald-600 font-label-sm font-semibold">+10%</span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant">Всего учеников</p>
            <h2 className="font-h2 text-h2 font-bold">{students.length}</h2>
          </div>
        </div>

        {/* Widget: Monthly Revenue */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-lg">payments</span>
            <span className="text-emerald-600 font-label-sm font-semibold">+148,000 ₸</span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant">Выручка за месяц</p>
            <h2 className="font-h2 text-h2 font-bold">1,400,000 ₸</h2>
          </div>
        </div>

        {/* Widget: Active Groups */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-lg">diversity_3</span>
            <span className="text-on-surface-variant font-label-sm font-semibold">12 активно</span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant">Всего групп</p>
            <h2 className="font-h2 text-h2 font-bold">14</h2>
          </div>
        </div>

        {/* Widget: Overdue Payments */}
        <div
          onClick={() => {
            onNavigateToStudents("Просрочен"); // Switches tab with filter
          }}
          className="bg-error-container border border-error/20 rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-md hover:border-error/40 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <span className="material-symbols-outlined text-error p-2 rounded-lg bg-white/60 group-hover:animate-bounce">
              warning
            </span>
            <span className="text-error font-label-sm font-bold">Критично</span>
          </div>
          <div>
            <p className="font-label-md text-on-error-container font-medium">Просроченные платежи</p>
            <h2 className="font-h2 text-h2 text-on-error-container font-bold">{overdueCount}</h2>
          </div>
        </div>
      </div>

      {/* Dashboard Main Content Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Today's Schedule */}
        <TodaySchedule schedule={schedule} onShowToast={onShowToast} />

        {/* Attendance Summary */}
        <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-h3 text-h3 font-bold">Посещаемость за неделю</h3>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface">
              more_vert
            </span>
          </div>
          <div className="flex-grow min-h-[200px] flex items-end justify-between gap-3 px-2 pt-6 pb-2">
            {[
              { day: "Пн", percent: 84, height: "60%" },
              { day: "Вт", percent: 92, height: "85%" },
              { day: "Ср", percent: 88, height: "70%" },
              { day: "Чт", percent: 95, height: "90%" },
              { day: "Пт", percent: 65, height: "40%" },
            ].map((bar, index) => (
              <div
                key={index}
                className="w-full bg-primary/10 rounded-t-lg relative group flex flex-col justify-end"
                style={{ height: bar.height }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap z-25">
                  {bar.percent}%
                </div>
                <div className="w-full bg-primary rounded-t-lg h-full transition-all duration-300 group-hover:bg-primary/95 group-hover:brightness-110 shadow-sm" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-label-sm text-xs text-on-surface-variant">
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-outline-variant mt-4">
            <div className="flex items-center justify-between text-body-sm text-sm">
              <span className="text-on-surface-variant">Средняя за неделю</span>
              <span className="font-bold text-primary text-lg">84.8%</span>
            </div>
          </div>
        </section>
      </div>

      {/* Second Row: Recent Payments & Registrations */}
      <div className="grid grid-cols-12 gap-gutter">
        <RecentPayments payments={payments} onViewDetails={onViewPayment} onShowToast={onShowToast} />
        
        <NewRegistrations
          onRenew={onRenewSubscription}
          onShowToast={onShowToast}
          onNavigateToStudents={onNavigateToStudents}
        />
      </div>

      {/* FAB */}
      <button
        onClick={() => onShowToast("Создание события расписания")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary-container text-on-primary rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center z-45"
      >
        <span className="material-symbols-outlined text-[30px]">edit_calendar</span>
      </button>
    </div>
  );
};
