import React, { useState } from "react";

interface CreateTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (teacherData: {
    name: string;
    subject: string;
    experience: string;
    phone: string;
    email: string;
    status: "Активен" | "В отпуске" | string;
  }) => void;
}

export const CreateTeacherModal: React.FC<CreateTeacherModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    experience: "",
    phone: "",
    email: "",
    status: "Активен",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.subject || !form.experience || !form.phone) return;

    onCreate({
      name: form.name,
      subject: form.subject,
      experience: form.experience,
      phone: form.phone,
      email: form.email || "teacher@example.com",
      status: form.status,
    });

    // Reset
    setForm({
      name: "",
      subject: "",
      experience: "",
      phone: "",
      email: "",
      status: "Активен",
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
          <span className="material-symbols-outlined text-primary">school</span>
          Добавить преподавателя
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Заполните личную карточку преподавателя для добавления в штат.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">ФИО Преподавателя *</label>
            <input
              required
              type="text"
              placeholder="Например: Самат Нуртаев"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Предмет / Специальность *</label>
              <input
                required
                type="text"
                placeholder="Например: Высшая математика"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Опыт работы (лет) *</label>
              <input
                required
                type="text"
                placeholder="Например: 5 лет или 12 лет"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Телефон *</label>
              <input
                required
                type="tel"
                placeholder="+7 (777) 123-4567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Email</label>
              <input
                type="email"
                placeholder="teacher@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Статус *</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="Активен">Активен</option>
              <option value="В отпуске">В отпуске</option>
            </select>
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
