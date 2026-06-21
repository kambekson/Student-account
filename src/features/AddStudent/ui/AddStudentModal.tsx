import React, { useState } from "react";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (studentData: {
    name: string;
    parentName: string;
    group: string;
    subscriptionStatus: string;
    balance: number;
  }) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [form, setForm] = useState({
    name: "",
    parentName: "",
    group: "Основы математики",
    subscriptionStatus: "Активна",
    balance: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.parentName) return;

    onAdd({
      name: form.name,
      parentName: form.parentName,
      group: form.group,
      subscriptionStatus: form.subscriptionStatus,
      balance: parseFloat(form.balance) || 0,
    });

    // Reset
    setForm({
      name: "",
      parentName: "",
      group: "Основы математики",
      subscriptionStatus: "Активна",
      balance: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-outline-variant rounded-2xl w-full max-w-lg shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person_add</span>
          Добавить нового ученика
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Заполните поля ниже, чтобы зарегистрировать нового ученика в базе.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">ФИО Ученика *</label>
            <input
              required
              type="text"
              placeholder="Например: Иван Иванов"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">ФИО Родителя *</label>
            <input
              required
              type="text"
              placeholder="Например: Анна Иванова"
              value={form.parentName}
              onChange={(e) => setForm({ ...form, parentName: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Группа</label>
              <select
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option>Основы математики</option>
                <option>Творческое письмо A</option>
                <option>Продвинутая физика</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Статус подписки</label>
              <select
                value={form.subscriptionStatus}
                onChange={(e) => setForm({ ...form, subscriptionStatus: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="Активна">Активна</option>
                <option value="Истекает (3д)">Истекает (3 дня)</option>
                <option value="Просрочена">Просрочена</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Баланс (₽)</label>
            <input
              type="number"
              placeholder="0"
              value={form.balance}
              onChange={(e) => setForm({ ...form, balance: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant rounded-xl font-semibold text-xs text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-on-primary rounded-xl font-semibold text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-md"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
