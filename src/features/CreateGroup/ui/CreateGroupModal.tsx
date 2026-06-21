import React, { useState } from "react";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (groupData: {
    name: string;
    subject: string;
    teacherName: string;
    schedule: string;
    room: string;
    maxStudents: number;
  }) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [form, setForm] = useState({
    name: "",
    subject: "Точные науки",
    teacherName: "",
    schedule: "",
    room: "",
    maxStudents: "15",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.teacherName || !form.schedule || !form.room) return;

    onCreate({
      name: form.name,
      subject: form.subject,
      teacherName: form.teacherName,
      schedule: form.schedule,
      room: form.room,
      maxStudents: parseInt(form.maxStudents) || 15,
    });

    // Reset
    setForm({
      name: "",
      subject: "Точные науки",
      teacherName: "",
      schedule: "",
      room: "",
      maxStudents: "15",
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
          <span className="material-symbols-outlined text-primary">diversity_3</span>
          Создать новую группу
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Заполните поля ниже, чтобы создать новую учебную группу в базе.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Название группы *</label>
            <input
              required
              type="text"
              placeholder="Например: Математика А-12"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Предмет</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option>Точные науки</option>
                <option>Технологии</option>
                <option>Языки</option>
                <option>Экзамены</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Макс. студентов</label>
              <input
                type="number"
                value={form.maxStudents}
                onChange={(e) => setForm({ ...form, maxStudents: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Преподаватель *</label>
            <input
              required
              type="text"
              placeholder="Например: Алихан Смаилов"
              value={form.teacherName}
              onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Расписание *</label>
              <input
                required
                type="text"
                placeholder="Пн, Ср 16:00"
                value={form.schedule}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Кабинет / Класс *</label>
              <input
                required
                type="text"
                placeholder="Каб. 402"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
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
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
