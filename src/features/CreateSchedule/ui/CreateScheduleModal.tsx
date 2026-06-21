import React, { useState } from "react";

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (scheduleData: {
    title: string;
    groupName: string;
    teacher: string;
    dayOfWeek: "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс";
    time: string;
    room: string;
  }) => void;
}

export const CreateScheduleModal: React.FC<CreateScheduleModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [form, setForm] = useState({
    title: "",
    groupName: "",
    teacher: "",
    dayOfWeek: "Пн" as "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс",
    time: "09:00 - 10:30",
    room: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.groupName || !form.teacher || !form.room) return;

    onCreate({
      title: form.title,
      groupName: form.groupName,
      teacher: form.teacher,
      dayOfWeek: form.dayOfWeek,
      time: form.time,
      room: form.room,
    });

    // Reset
    setForm({
      title: "",
      groupName: "",
      teacher: "",
      dayOfWeek: "Пн",
      time: "09:00 - 10:30",
      room: "",
    });
  };

  const dayOptions: ("Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс")[] = [
    "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"
  ];

  const timeOptions = [
    "09:00 - 10:30",
    "11:00 - 12:30",
    "14:00 - 15:30",
    "16:00 - 17:30",
    "18:30 - 20:00"
  ];

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
          <span className="material-symbols-outlined text-primary">calendar_month</span>
          Добавить занятие в расписание
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Заполните детали занятия для добавления в еженедельную сетку.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Название предмета / занятия *</label>
            <input
              required
              type="text"
              placeholder="Например: Высшая математика"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Группа *</label>
              <input
                required
                type="text"
                placeholder="Например: Группа А-12"
                value={form.groupName}
                onChange={(e) => setForm({ ...form, groupName: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Преподаватель *</label>
              <input
                required
                type="text"
                placeholder="ФИО преподавателя"
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">День недели *</label>
              <select
                value={form.dayOfWeek}
                onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value as any })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                {dayOptions.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Время проведения *</label>
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Кабинет / Аудитория *</label>
            <input
              required
              type="text"
              placeholder="Например: Каб. 402 или Лаб. 1"
              value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
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
