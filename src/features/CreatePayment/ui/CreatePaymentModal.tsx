import React, { useState } from "react";

interface CreatePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (paymentData: {
    studentName: string;
    amount: number;
    date: string;
    status: "Оплачено" | "Ошибка";
  }) => void;
}

export const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [form, setForm] = useState({
    studentName: "",
    amount: "",
    status: "Оплачено" as "Оплачено" | "Ошибка",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.amount) return;

    // Get current date formatted like "21 июн. 2026"
    const now = new Date();
    const months = [
      "янв.", "фев.", "мар.", "апр.", "май", "июн.",
      "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."
    ];
    const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    onCreate({
      studentName: form.studentName,
      amount: parseFloat(form.amount) || 0,
      date: formattedDate,
      status: form.status,
    });

    // Reset
    setForm({
      studentName: "",
      amount: "",
      status: "Оплачено",
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
          <span className="material-symbols-outlined text-primary">payments</span>
          Зафиксировать платёж
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Внесите данные о транзакции ученика в систему бухгалтерского учета.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">ФИО Ученика *</label>
            <input
              required
              type="text"
              placeholder="Например: Юлиан Стерлинг"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Сумма (₸) *</label>
              <input
                required
                type="number"
                placeholder="Например: 85000"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Статус платежа *</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="Оплачено">Оплачено</option>
                <option value="Ошибка">Ошибка</option>
              </select>
            </div>
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
              Провести
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
