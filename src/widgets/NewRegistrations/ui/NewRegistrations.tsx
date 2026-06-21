import React from "react";

interface NewRegistrationsProps {
  onRenew: (studentName: string) => void;
  onShowToast: (message: string) => void;
  onNavigateToStudents: (searchQuery: string) => void;
}

export const NewRegistrations: React.FC<NewRegistrationsProps> = ({
  onRenew,
  onShowToast,
  onNavigateToStudents,
}) => {
  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
      {/* New Registrations Feed */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-h3 text-h3 font-bold">Новые регистрации</h3>
            <span className="material-symbols-outlined text-primary text-[22px]">person_add</span>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3 items-start pb-4 border-b border-outline-variant last:border-0 last:pb-0">
              <img
                alt="Джейми Чен"
                className="w-10 h-10 rounded-lg object-cover border border-outline-variant/30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApsBJ6R_d0zQnGn0fMwq_vy1DtzmVzrVHQ0oCj-4hbc5yGF5hzlKUJv7L7h_dCA3SwLkk_449HA_YB10aRwC7pkbJswB3ae11bUMUdAhvJ_TDhkywsrQTGO8EgTYUS3RnsbOVGB0gLHUKmQv4chq_O5KzEFjEaaLmE0666P6zRtzekbHBvvzUe3c9PrlBSLPZeZ7i3BB8NK4UdrHBfW5dLTkKSaiG0d1ZXO9QnC4clDOGYg_i592C6k__2IPDolbEk1v9f9ZgqnYV9"
              />
              <div className="flex-1">
                <p className="font-body-md font-semibold text-sm">Джейми Чен</p>
                <p className="text-xs text-on-surface-variant">Записан: Класс фортепиано</p>
                <p className="text-[10px] text-on-surface-variant/70 mt-1">2 часа назад</p>
              </div>
              <button
                onClick={() => onNavigateToStudents("Джейми Чен")}
                className="text-primary hover:text-primary-container material-symbols-outlined"
              >
                chevron_right
              </button>
            </div>

            <div className="flex gap-3 items-start pb-4 border-b border-outline-variant last:border-0 last:pb-0">
              <img
                alt="София Мартинес"
                className="w-10 h-10 rounded-lg object-cover border border-outline-variant/30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH1AgpvQVD2EjyPsPlvCnGId75ANTd79R5eZi2ELMOu5Q8eg8w4PE5BkPrbsKkGLQRvyc-V1P41XO6eng7Aj0G43ihqcl3qfPcooLLuwGIkTKOFWT2K67isgwDYwzHt-UgX0-Lh2enNBbdOTdjbPc5Km2DnPMVrIu4_Br9sFALdWZBC3t7KylSZMVtLhE2Uz9W1-InzbIeDin1kL2bnD_yVeTYWZw7SvYrJasCn0Kb_6P3yuaX154UhNTQIA88I44oWB0lm36JiAZL"
              />
              <div className="flex-1">
                <p className="font-body-md font-semibold text-sm">София Мартинес</p>
                <p className="text-xs text-on-surface-variant">Записана: Подготовка к физике</p>
                <p className="text-[10px] text-on-surface-variant/70 mt-1">5 часов назад</p>
              </div>
              <button
                onClick={() => onNavigateToStudents("София Мартинес")}
                className="text-primary hover:text-primary-container material-symbols-outlined"
              >
                chevron_right
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigateToStudents("")}
          className="w-full mt-5 py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors font-semibold"
        >
          Смотреть всех
        </button>
      </section>

      {/* Subscription Expirations */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
        <h3 className="font-h3 text-h3 font-bold mb-4">Уведомления по подпискам</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-error-container/20 border border-error-container/40">
            <div>
              <p className="text-sm font-semibold text-on-surface">Маркус Уэбб</p>
              <p className="text-[10px] text-error font-semibold mt-0.5">Истекает через 2 дня</p>
            </div>
            <button
              onClick={() => onRenew("Маркус Уэбб")}
              className="bg-error hover:bg-error/90 active:scale-[0.97] transition-all text-on-error px-3 py-1 rounded text-[11px] font-bold tracking-wide"
            >
              ПРОДЛИТЬ
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant">
            <div>
              <p className="text-sm font-semibold text-on-surface">Лейла С.</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Истекает через 8 дней</p>
            </div>
            <button
              onClick={() => onShowToast("Родителю Лейлы отправлено СМС-уведомление")}
              className="text-primary hover:text-primary/80 transition-colors font-semibold text-xs"
            >
              Уведомить родителя
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
