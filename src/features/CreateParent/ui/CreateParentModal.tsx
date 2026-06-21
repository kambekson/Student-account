import React, { useState } from "react";

interface CreateParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (parentData: {
    name: string;
    childName: string;
    phone: string;
    email: string;
    balance: number;
  }) => void;
}

export const CreateParentModal: React.FC<CreateParentModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [form, setForm] = useState({
    name: "",
    childName: "",
    phone: "",
    email: "",
    balance: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.childName || !form.phone) return;

    onCreate({
      name: form.name,
      childName: form.childName,
      phone: form.phone,
      email: form.email,
      balance: parseFloat(form.balance) || 0,
    });

    // Reset
    setForm({
      name: "",
      childName: "",
      phone: "",
      email: "",
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
          <span className="material-symbols-outlined text-primary">family_restroom</span>
          Добавить родителя
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Заполните контактную информацию родителя для привязки к ученику.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">ФИО Родителя *</label>
            <input
              required
              type="text"
              placeholder="Например: Анна Иванова"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">ФИО Ученика (Ребенка) *</label>
            <input
              required
              type="text"
              placeholder="Например: Иван Иванов"
              value={form.childName}
              onChange={(e) => setForm({ ...form, childName: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Телефон *</label>
              <input
                required
                type="tel"
                placeholder="+7 (707) 123-4567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Email</label>
              <input
                type="email"
                placeholder="parent@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
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
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
