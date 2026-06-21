import React, { useState, useMemo } from "react";

// Mock interfaces
interface Student {
  id: string;
  name: string;
  avatar: string;
  parentName: string;
  groups: string[];
  lastVisitDate: string;
  lastVisitStatus: "Присутствовал" | "Присутствовала" | "Отсутствовал (Уваж.)" | "Прогул (3+ дня)";
  subscriptionStatus: "Активна" | "Истекает (3д)" | "Истекает (2д)" | "Просрочена";
  balance: number;
}

interface Payment {
  id: string;
  studentName: string;
  avatarInitials: string;
  amount: number;
  date: string;
  status: "Оплачено" | "Ошибка";
}

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  groupName: string;
  teacher: string;
  room: string;
  status: "Идет" | "Ожидается";
}

interface TaskItem {
  id: string;
  text: string;
  deadline?: string;
  subtext?: string;
  completed: boolean;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: "#ST-8821",
    name: "Юлиан Стерлинг",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3-EAcxl9Wb8jo_5qGvnO-po-0k1aZaFY8SzVz1Fbt1tLrMOeF0pF-mu4MD8p0WLGNGrGVFo7VehHXQSIa7G_FLSt_5yvC6WgS4E6EJlkwBSqf4yAU7lbDtogu66AVUxEcg2F5V2YHn7jrYa1jMJB2eNp7anMCWjyABy4Z13N2IephPL15q5loRuIvbAv0V4LNO-BIqsPNl-KI8Xs1mk5s6ZpSeZsjXNlm88ALmj-jJLZnCwVUUJhBPa_yMVQ4WF2m8uRXPBJGhYa9",
    parentName: "Элеонора Стерлинг",
    groups: ["Физ-Продв", "Мат-12"],
    lastVisitDate: "24 окт. 2023",
    lastVisitStatus: "Присутствовал",
    subscriptionStatus: "Активна",
    balance: 0,
  },
  {
    id: "#ST-8822",
    name: "Амара Окафор",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2Pg7wSzzhMvvJMrvEKsIkC1VwufvmdAAtowLFklRzrPZH7n7NahxPY2ShPGWAxRbZc1FACGbXgRcNhCuhK-5m8xwN1lkqP6GeK6bKmOpAeOO82noEoCiYILbUwELmx5HBicOusSRnYThp_Wv_eC4aeO6qnc-K1v4abijG3CWA7zp9DQIhQ36DQgU2KAXByAO-oONQpETVaJgugsJDhNJL2-6gZwiKIjWmU3JlsuklK8A4FK6pe2KJgPrIr5pa7yb3L5QPWYOZUUE_",
    parentName: "Давид Окафор",
    groups: ["Био-Фокус"],
    lastVisitDate: "23 окт. 2023",
    lastVisitStatus: "Отсутствовал (Уваж.)",
    subscriptionStatus: "Истекает (3д)",
    balance: 8500,
  },
  {
    id: "#ST-8823",
    name: "Лиам Вэнс",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0clD29JCq0Zmm_eJzV9C-5NEFvOYicSYFILqrOP2FF3VhGFyG-QBmK9N3EQPZNkOY79uD-bl7a_9yRXF2mSa0Bvj9tRbPfVFlI4YG8byyAWsTqqc_sxHR1ULqRX_FhlF5c-iGn9T_8np70mBWu97W92y8K66uMOFhQwMYcvJu3oCruZR1ARaVUCg9ofPdrUysZvRAycpQiV5Cj1jL5g0RCQcMUU1twDpg69Ftwwp4BINlUzYq8ZBedUAxcsto4HI88dLKvaQ2UeYx",
    parentName: "Сара Вэнс",
    groups: ["Языки", "Музыка-3"],
    lastVisitDate: "18 окт. 2023",
    lastVisitStatus: "Прогул (3+ дня)",
    subscriptionStatus: "Просрочена",
    balance: 32000,
  },
  {
    id: "#ST-8824",
    name: "Хлоя Чжан",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-OodgvOEWL1kep8YrR4BzeIpsqKITfzAz_z3uFUVky1qrNeoPnNv4h3Squj5SZyNpUGezisk7tZnJ-gNCtUHdvUIn7bYqbe-ETKWMAOL5KK728S9e3KylZZTw_WcBDWcoTSpHavByCJcJjRHOL9NlSbpAGuO9jrCQtMvWebLRJTWJZxgT4C2xgGB47Jp1FOtqXpQGbmAJXyFsGCYk9dTnefi7WeMxZMOWfA4-VhZ4U2pLfhi-nkziqLFLizl71B6weIBhYb9v1IUI",
    parentName: "Ли Чжан",
    groups: ["Ист. искусств"],
    lastVisitDate: "24 окт. 2023",
    lastVisitStatus: "Присутствовала",
    subscriptionStatus: "Активна",
    balance: 0,
  },
  {
    id: "#ST-8825",
    name: "Алиса Миллер",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcmTyW4FrQ4ydUnLYZO11aSS89GEekM3MsMz86oCZbecyc5FzBTURpIhWuZT7YIjVb86Y0yGWIqqCYR9eIIDmYZdjaxZuMXcNwsR0nKv2SuhaFgLfcWDP1pH-95osGaiMhisL7olA4V4w9179JxhFcLkP1Di4P3pvmB8Qnr-N5jsyvfdoRG3EEnUOfHPKcLJjeyMMAFwftGLE6PsSRoc09FPwB1t0VhemhAPW0JcDIvnOBsDxUMJ64ufro8VNSKOgHxWUIJk7QJEAX",
    parentName: "Роберт Миллер",
    groups: ["Мат-12", "Физ-Продв"],
    lastVisitDate: "22 окт. 2023",
    lastVisitStatus: "Присутствовала",
    subscriptionStatus: "Активна",
    balance: 0,
  },
  {
    id: "#ST-8826",
    name: "Давид Райт",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3-EAcxl9Wb8jo_5qGvnO-po-0k1aZaFY8SzVz1Fbt1tLrMOeF0pF-mu4MD8p0WLGNGrGVFo7VehHXQSIa7G_FLSt_5yvC6WgS4E6EJlkwBSqf4yAU7lbDtogu66AVUxEcg2F5V2YHn7jrYa1jMJB2eNp7anMCWjyABy4Z13N2IephPL15q5loRuIvbAv0V4LNO-BIqsPNl-KI8Xs1mk5s6ZpSeZsjXNlm88ALmj-jJLZnCwVUUJhBPa_yMVQ4WF2m8uRXPBJGhYa9",
    parentName: "Хелен Райт",
    groups: ["Химия"],
    lastVisitDate: "21 окт. 2023",
    lastVisitStatus: "Присутствовал",
    subscriptionStatus: "Активна",
    balance: 0,
  },
  {
    id: "#ST-8827",
    name: "Джейми Чен",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuApsBJ6R_d0zQnGn0fMwq_vy1DtzmVzrVHQ0oCj-4hbc5yGF5hzlKUJv7L7h_dCA3SwLkk_449HA_YB10aRwC7pkbJswB3ae11bUMUdAhvJ_TDhkywsrQTGO8EgTYUS3RnsbOVGB0gLHUKmQv4chq_O5KzEFjEaaLmE0666P6zRtzekbHBvvzUe3c9PrlBSLPZeZ7i3BB8NK4UdrHBfW5dLTkKSaiG0d1ZXO9QnC4clDOGYg_i592C6k__2IPDolbEk1v9f9ZgqnYV9",
    parentName: "Кен Чен",
    groups: ["Музыка-3"],
    lastVisitDate: "24 окт. 2023",
    lastVisitStatus: "Присутствовал",
    subscriptionStatus: "Активна",
    balance: 0,
  },
  {
    id: "#ST-8828",
    name: "София Мартинес",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH1AgpvQVD2EjyPsPlvCnGId75ANTd79R5eZi2ELMOu5Q8eg8w4PE5BkPrbsKkGLQRvyc-V1P41XO6eng7Aj0G43ihqcl3qfPcooLLuwGIkTKOFWT2K67isgwDYwzHt-UgX0-Lh2enNBbdOTdjbPc5Km2DnPMVrIu4_Br9sFALdWZBC3t7KylSZMVtLhE2Uz9W1-InzbIeDin1kL2bnD_yVeTYWZw7SvYrJasCn0Kb_6P3yuaX154UhNTQIA88I44oWB0lm36JiAZL",
    parentName: "Хуан Мартинес",
    groups: ["Физ-Продв"],
    lastVisitDate: "24 окт. 2023",
    lastVisitStatus: "Присутствовала",
    subscriptionStatus: "Активна",
    balance: 4200,
  }
];

const INITIAL_PAYMENTS: Payment[] = [
  { id: "p1", studentName: "Алиса Миллер", avatarInitials: "АМ", amount: 350000, date: "12 окт. 2023", status: "Оплачено" },
  { id: "p2", studentName: "Давид Райт", avatarInitials: "ДР", amount: 120000, date: "11 окт. 2023", status: "Оплачено" },
  { id: "p3", studentName: "Хлоя Чжан", avatarInitials: "ХЧ", amount: 30000, date: "11 окт. 2023", status: "Ошибка" },
];

const INITIAL_SCHEDULE: ScheduleItem[] = [
  { id: "s1", time: "09:00 - 10:30", title: "Высшая математика", groupName: "Группа A-12", teacher: "Сара Дженкинс", room: "Каб. 402", status: "Идет" },
  { id: "s2", time: "11:00 - 12:30", title: "Творческое письмо", groupName: "Группа B-05", teacher: "Марк Томпсон", room: "Библиотека", status: "Ожидается" },
  { id: "s3", time: "14:00 - 15:30", title: "Введение в физику", groupName: "Группа C-01", teacher: "Д-р Елена Волкова", room: "Лаб. 1", status: "Ожидается" },
  { id: "s4", time: "16:00 - 17:30", title: "Теория фортепиано", groupName: "Частный-44", teacher: "Джулиан Росси", room: "Студия A", status: "Ожидается" },
];

const INITIAL_TASKS: TaskItem[] = [
  { id: "t1", text: "Выставить счет Амаре Окафор", deadline: "через 2ч", completed: false },
  { id: "t2", text: "Проверить док-ты Юлиана", subtext: "Ожидает загрузки", completed: false },
  { id: "t3", text: "Позвонить родителям Лиама", subtext: "Контроль пропусков", completed: false },
];

const App: React.FC = () => {
  // Navigation & Tabs State
  const [activeTab, setActiveTab] = useState<"dashboard" | "students">("dashboard");

  // Core Data States
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Все группы");
  const [selectedStatus, setSelectedStatus] = useState("Все статусы");

  // Modals States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState<Payment | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Add Student Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    parentName: "",
    group: "Основы математики",
    subscriptionStatus: "Активна",
    balance: ""
  });

  // Simple Notification System
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Pagination for Students Registry Table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filtered Students (used for table and counts)
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.parentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGroup =
        selectedGroup === "Все группы" ||
        student.groups.some((g) => g.toLowerCase().includes(selectedGroup.split(" ")[0].toLowerCase()));

      const matchesStatus =
        selectedStatus === "Все статусы" ||
        (selectedStatus === "Активен" && student.subscriptionStatus === "Активна") ||
        (selectedStatus === "Истекает" && student.subscriptionStatus.startsWith("Истекает")) ||
        (selectedStatus === "Просрочен" && student.subscriptionStatus === "Просрочена");

      return matchesSearch && matchesGroup && matchesStatus;
    });
  }, [students, searchQuery, selectedGroup, selectedStatus]);

  // Paginated Students
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  // Form submit handler
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.parentName) {
      showToast("Пожалуйста, заполните основные поля!");
      return;
    }

    const nextId = `#ST-${8800 + students.length + 1}`;
    const newStudentObj: Student = {
      id: nextId,
      name: newStudent.name,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcmTyW4FrQ4ydUnLYZO11aSS89GEekM3MsMz86oCZbecyc5FzBTURpIhWuZT7YIjVb86Y0yGWIqqCYR9eIIDmYZdjaxZuMXcNwsR0nKv2SuhaFgLfcWDP1pH-95osGaiMhisL7olA4V4w9179JxhFcLkP1Di4P3pvmB8Qnr-N5jsyvfdoRG3EEnUOfHPKcLJjeyMMAFwftGLE6PsSRoc09FPwB1t0VhemhAPW0JcDIvnOBsDxUMJ64ufro8VNSKOgHxWUIJk7QJEAX",
      parentName: newStudent.parentName,
      groups: [newStudent.group === "Основы математики" ? "Мат-Осн" : newStudent.group === "Творческое письмо A" ? "Пис-А" : "Физ-Продв"],
      lastVisitDate: "Сегодня",
      lastVisitStatus: "Присутствовал",
      subscriptionStatus: newStudent.subscriptionStatus as any,
      balance: parseFloat(newStudent.balance) || 0,
    };

    setStudents([newStudentObj, ...students]);
    setIsAddModalOpen(false);
    // Reset Form
    setNewStudent({
      name: "",
      parentName: "",
      group: "Основы математики",
      subscriptionStatus: "Активна",
      balance: ""
    });
    showToast(`Ученик ${newStudentObj.name} успешно добавлен!`);
  };

  // Helper toggle tasks
  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Renew subscription helper
  const handleRenewSubscription = (studentName: string) => {
    setStudents(
      students.map((student) => {
        if (student.name === studentName) {
          return { ...student, subscriptionStatus: "Активна" };
        }
        return student;
      })
    );
    showToast(`Подписка для ${studentName} продлена!`);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans select-none relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-outline/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Side Navigation Bar */}
      <aside className="fixed left-0 top-0 h-screen w-[260px] bg-surface border-r border-outline-variant flex flex-col gap-sm p-4 z-40">
        <div className="mb-stack-gap-lg px-2 mt-2">
          <h1 className="font-display text-[22px] font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">school</span>
            EduCenter Pro
          </h1>
          <p className="font-body-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Консоль админа</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto sidebar-scroll">
          {/* Dashboard Active */}
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all ${activeTab === "dashboard"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Панель управления</span>
          </button>

          {/* Students Active */}
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all ${activeTab === "students"
              ? "bg-primary-container text-on-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
          >
            <span className="material-symbols-outlined">group</span>
            <span>Ученики</span>
          </button>

          {/* Inactive Items */}
          <button onClick={() => showToast("Раздел находится в разработке")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left">
            <span className="material-symbols-outlined">family_restroom</span>
            <span>Родители</span>
          </button>
          <button onClick={() => showToast("Раздел находится в разработке")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left">
            <span className="material-symbols-outlined">diversity_3</span>
            <span>Группы</span>
          </button>
          <button onClick={() => showToast("Раздел находится в разработке")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Расписание</span>
          </button>
          <button onClick={() => showToast("Раздел находится в разработке")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left">
            <span className="material-symbols-outlined">how_to_reg</span>
            <span>Посещаемость</span>
          </button>
          <button onClick={() => showToast("Раздел находится в разработке")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left">
            <span className="material-symbols-outlined">payments</span>
            <span>Платежи</span>
          </button>
          <button onClick={() => showToast("Раздел находится в разработке")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left">
            <span className="material-symbols-outlined">card_membership</span>
            <span>Подписки</span>
          </button>
          <button onClick={() => showToast("Раздел находится в разработке")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left">
            <span className="material-symbols-outlined">school</span>
            <span>Преподаватели</span>
          </button>
          <button onClick={() => showToast("Раздел находится в разработке")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md text-left">
            <span className="material-symbols-outlined">analytics</span>
            <span>Отчеты</span>
          </button>
        </nav>

        {/* User profile footer */}
        <div className="mt-auto pt-4 border-t border-outline-variant">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-container-low">
            <img alt="Администратор" className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcmTyW4FrQ4ydUnLYZO11aSS89GEekM3MsMz86oCZbecyc5FzBTURpIhWuZT7YIjVb86Y0yGWIqqCYR9eIIDmYZdjaxZuMXcNwsR0nKv2SuhaFgLfcWDP1pH-95osGaiMhisL7olA4V4w9179JxhFcLkP1Di4P3pvmB8Qnr-N5jsyvfdoRG3EEnUOfHPKcLJjeyMMAFwftGLE6PsSRoc09FPwB1t0VhemhAPW0JcDIvnOBsDxUMJ64ufro8VNSKOgHxWUIJk7QJEAX" />
            <div className="overflow-hidden">
              <p className="font-label-md text-label-md truncate font-semibold">Администратор</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Директор</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="ml-[260px] flex flex-col min-h-screen">

        {/* Top Navbar */}
        <header className="h-[64px] flex items-center justify-between px-6 bg-surface border-b border-outline-variant sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset pagination on search
                }}
                className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-on-surface-variant/60"
                placeholder={activeTab === "students" ? "Поиск учеников или родителей..." : "Поиск по панели управления..."}
                type="text"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-[0.98] transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Добавить
            </button>
            <div className="h-8 w-[1px] bg-outline-variant mx-1"></div>

            {/* Notifications Dropdown Container */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 hover:bg-surface-container-low rounded-full transition-colors relative ${notificationsOpen ? 'bg-surface-container-low' : ''}`}
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface border border-outline-variant rounded-xl shadow-xl z-50 p-4">
                  <h4 className="font-semibold text-sm mb-3">Уведомления</h4>
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-lg bg-error-container/20 border border-error-container/40 text-xs">
                      <p className="font-semibold text-on-error-container">Маркус Уэбб</p>
                      <p className="text-on-surface-variant mt-0.5">Срок действия подписки истекает через 2 дня.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-low text-xs">
                      <p className="font-semibold">Хлоя Чжан</p>
                      <p className="text-on-surface-variant mt-0.5">Ошибка при обработке ежемесячного платежа.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setNotificationsOpen(false);
                      showToast("Все уведомления прочитаны");
                    }}
                    className="w-full text-center text-xs text-primary font-semibold mt-4 pt-2 border-t border-outline-variant hover:underline"
                  >
                    Отметить все как прочитанные
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => showToast("Справочный центр готовится к запуску")} className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
              <span className="material-symbols-outlined">help_outline</span>
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-outline-variant/65">
              <div className="text-right">
                <p className="font-label-md text-label-md text-on-surface leading-tight font-semibold">Администратор</p>
                <p className="text-[11px] text-on-surface-variant">Модератор</p>
              </div>
              <img className="w-10 h-10 rounded-full border border-outline-variant object-cover" alt="Админ" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcbp7rzBBh_FU81PA12ndHau7OGNz_tKEBm2klt4seDFqOkqbOdK-ovoZKno_RAbMuXIFAebFANC4btxU0Ge2jxGwJ2ue7htOsbjDvqpkfdjS8bxQwS9uBXvaytPrMWZJMGJJVZpQo_i_I-dT8WPmO2-Sv4ntiymVvvIGtmsWj1-xTv9u2NslQkkQFX0EJxJZhfRYf1_CW_Qyum86puYTC5W3b4cR7SDjhwGCRz1T7YFH8qG05VLhhg7cyr_hEmh8D0FmJBG4jhgNE" />
            </div>
          </div>
        </header>

        {/* Dynamic Main Content Canvas */}
        <main className="flex-grow p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">

            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <>
                {/* Bento Widgets Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Widget: Total Students */}
                  <div
                    onClick={() => setActiveTab("students")}
                    className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg group-hover:scale-110 transition-transform">group</span>
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
                      setSelectedStatus("Просрочен");
                      setActiveTab("students");
                    }}
                    className="bg-error-container border border-error/20 rounded-xl p-4 flex flex-col justify-between h-32 hover:shadow-md hover:border-error/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="material-symbols-outlined text-error p-2 rounded-lg bg-white/60 group-hover:animate-bounce">warning</span>
                      <span className="text-error font-label-sm font-bold">Критично</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-error-container font-medium">Просроченные платежи</p>
                      <h2 className="font-h2 text-h2 text-on-error-container font-bold">
                        {students.filter(s => s.subscriptionStatus === "Просрочена").length}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Dashboard Main Content Grid */}
                <div className="grid grid-cols-12 gap-gutter">

                  {/* Today's Schedule (8-column) */}
                  <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
                    <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                      <h3 className="font-h3 text-h3 flex items-center gap-2 text-on-surface font-bold">
                        <span className="material-symbols-outlined text-primary">event_upcoming</span>
                        Расписание на сегодня
                      </h3>
                      <button onClick={() => showToast("Календарь расписания откроется скоро")} className="text-primary font-label-md hover:underline font-semibold text-sm">Открыть календарь</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-surface-bright text-on-surface-variant border-b border-outline-variant font-label-sm uppercase">
                          <tr>
                            <th className="px-6 py-3 font-semibold text-xs">Время</th>
                            <th className="px-6 py-3 font-semibold text-xs">Группа / Урок</th>
                            <th className="px-6 py-3 font-semibold text-xs">Преподаватель</th>
                            <th className="px-6 py-3 font-semibold text-xs">Класс</th>
                            <th className="px-6 py-3 font-semibold text-xs">Статус</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                          {INITIAL_SCHEDULE.map((item) => (
                            <tr key={item.id} className="hover:bg-surface-container-low transition-colors duration-150">
                              <td className="px-6 py-4 font-label-md whitespace-nowrap text-sm font-semibold">{item.time}</td>
                              <td className="px-6 py-4">
                                <div className="font-body-md font-semibold text-sm text-on-surface">{item.title}</div>
                                <div className="text-xs text-on-surface-variant">{item.groupName}</div>
                              </td>
                              <td className="px-6 py-4 font-body-md text-sm text-on-surface-variant">{item.teacher}</td>
                              <td className="px-6 py-4 font-body-md text-sm text-on-surface-variant">{item.room}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${item.status === "Идет"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-secondary-container text-secondary"
                                  }`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Attendance Summary (4-column) */}
                  <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-h3 text-h3 font-bold">Посещаемость за неделю</h3>
                      <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface">more_vert</span>
                    </div>
                    {/* Mock Chart Container with tooltip support */}
                    <div className="flex-grow min-h-[200px] flex items-end justify-between gap-3 px-2 pt-6 pb-2">
                      {[
                        { day: "Пн", percent: 84, height: "60%" },
                        { day: "Вт", percent: 92, height: "85%" },
                        { day: "Ср", percent: 88, height: "70%" },
                        { day: "Чт", percent: 95, height: "90%" },
                        { day: "Пт", percent: 65, height: "40%" },
                      ].map((bar, index) => (
                        <div key={index} className="w-full bg-primary/10 rounded-t-lg relative group flex flex-col justify-end" style={{ height: bar.height }}>
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap z-25">
                            {bar.percent}%
                          </div>
                          <div className="w-full bg-primary rounded-t-lg h-full transition-all duration-300 group-hover:bg-primary/95 group-hover:brightness-110 shadow-sm" />
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-label-sm text-xs text-on-surface-variant">{bar.day}</span>
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
                  {/* Recent Payments (8-column) */}
                  <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                      <h3 className="font-h3 text-h3 flex items-center gap-2 text-on-surface font-bold">
                        <span className="material-symbols-outlined text-tertiary">receipt_long</span>
                        Последние платежи
                      </h3>
                      <div className="flex gap-2">
                        <button onClick={() => showToast("Фильтрация платежей")} className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                          <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        </button>
                        <button onClick={() => showToast("Скачивание реестра платежей")} className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-surface-bright text-on-surface-variant border-b border-outline-variant font-label-sm uppercase">
                          <tr>
                            <th className="px-6 py-3 font-semibold text-xs">Ученик</th>
                            <th className="px-6 py-3 font-semibold text-xs">Сумма</th>
                            <th className="px-6 py-3 font-semibold text-xs">Дата</th>
                            <th className="px-6 py-3 font-semibold text-xs">Статус</th>
                            <th className="px-6 py-3 w-16"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                          {payments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-surface-container-low transition-colors duration-150">
                              <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center font-bold text-[12px] shadow-sm">
                                  {payment.avatarInitials}
                                </div>
                                <span className="font-body-md font-semibold text-sm">{payment.studentName}</span>
                              </td>
                              <td className="px-6 py-4 font-body-md font-bold text-sm text-on-surface">
                                {payment.amount.toLocaleString("ru-RU")} ₸
                              </td>
                              <td className="px-6 py-4 font-body-sm text-sm text-on-surface-variant">{payment.date}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${payment.status === "Оплачено"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-error-container text-error"
                                  }`}>
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => setSelectedPaymentDetail(payment)}
                                  className="text-on-surface-variant hover:text-primary transition-colors p-1 hover:bg-surface-container rounded"
                                >
                                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Right side: New registrations & Expirations */}
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
                            <img alt="Джейми Чен" className="w-10 h-10 rounded-lg object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApsBJ6R_d0zQnGn0fMwq_vy1DtzmVzrVHQ0oCj-4hbc5yGF5hzlKUJv7L7h_dCA3SwLkk_449HA_YB10aRwC7pkbJswB3ae11bUMUdAhvJ_TDhkywsrQTGO8EgTYUS3RnsbOVGB0gLHUKmQv4chq_O5KzEFjEaaLmE0666P6zRtzekbHBvvzUe3c9PrlBSLPZeZ7i3BB8NK4UdrHBfW5dLTkKSaiG0d1ZXO9QnC4clDOGYg_i592C6k__2IPDolbEk1v9f9ZgqnYV9" />
                            <div className="flex-1">
                              <p className="font-body-md font-semibold text-sm">Джейми Чен</p>
                              <p className="text-xs text-on-surface-variant">Записан: Класс фортепиано</p>
                              <p className="text-[10px] text-on-surface-variant/70 mt-1">2 часа назад</p>
                            </div>
                            <button onClick={() => { setActiveTab("students"); setSearchQuery("Джейми Чен"); }} className="text-primary hover:text-primary-container material-symbols-outlined">chevron_right</button>
                          </div>

                          <div className="flex gap-3 items-start pb-4 border-b border-outline-variant last:border-0 last:pb-0">
                            <img alt="София Мартинес" className="w-10 h-10 rounded-lg object-cover border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH1AgpvQVD2EjyPsPlvCnGId75ANTd79R5eZi2ELMOu5Q8eg8w4PE5BkPrbsKkGLQRvyc-V1P41XO6eng7Aj0G43ihqcl3qfPcooLLuwGIkTKOFWT2K67isgwDYwzHt-UgX0-Lh2enNBbdOTdjbPc5Km2DnPMVrIu4_Br9sFALdWZBC3t7KylSZMVtLhE2Uz9W1-InzbIeDin1kL2bnD_yVeTYWZw7SvYrJasCn0Kb_6P3yuaX154UhNTQIA88I44oWB0lm36JiAZL" />
                            <div className="flex-1">
                              <p className="font-body-md font-semibold text-sm">София Мартинес</p>
                              <p className="text-xs text-on-surface-variant">Записана: Подготовка к физике</p>
                              <p className="text-[10px] text-on-surface-variant/70 mt-1">5 часов назад</p>
                            </div>
                            <button onClick={() => { setActiveTab("students"); setSearchQuery("София Мартинес"); }} className="text-primary hover:text-primary-container material-symbols-outlined">chevron_right</button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("students")}
                        className="w-full mt-5 py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
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
                            onClick={() => handleRenewSubscription("Маркус Уэбб")}
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
                            onClick={() => showToast("Родителю Лейлы отправлено СМС-уведомление")}
                            className="text-primary hover:text-primary/80 transition-colors font-semibold text-xs"
                          >
                            Уведомить родителя
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                {/* FAB */}
                <button
                  onClick={() => showToast("Создание события расписания")}
                  className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary-container text-on-primary rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center z-45"
                >
                  <span className="material-symbols-outlined text-[30px]">edit_calendar</span>
                </button>
              </>
            )}


            {/* TAB 2: STUDENTS REGISTRY */}
            {activeTab === "students" && (
              <>
                {/* Stats Headers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center justify-between">
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Ср. посещаемость</p>
                      <h2 className="font-h1 text-h1 text-on-surface font-bold text-3xl">94.2%</h2>
                      <div className="flex items-center gap-1 text-emerald-600 mt-1">
                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                        <span className="font-label-sm text-xs font-semibold">+2.4% с прошлого месяца</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary shadow-inner">
                      <span className="material-symbols-outlined text-[26px]">calendar_today</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center justify-between">
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Новые ученики</p>
                      <h2 className="font-h1 text-h1 text-on-surface font-bold text-3xl">28</h2>
                      <div className="flex items-center gap-1 text-emerald-600 mt-1">
                        <span className="material-symbols-outlined text-[16px]">person_add</span>
                        <span className="font-label-sm text-xs font-semibold">Сезон активного роста</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary shadow-inner">
                      <span className="material-symbols-outlined text-[26px]">group_add</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center justify-between">
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">В зоне риска</p>
                      <h2 className="font-h1 text-h1 text-on-surface font-bold text-3xl">
                        {students.filter(s => s.subscriptionStatus === "Просрочена" || s.lastVisitStatus === "Прогул (3+ дня)").length}
                      </h2>
                      <div className="flex items-center gap-1 text-error mt-1">
                        <span className="material-symbols-outlined text-[16px]">warning</span>
                        <span className="font-label-sm text-xs font-bold">Требуют внимания</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-error-container rounded-lg flex items-center justify-center text-error shadow-inner">
                      <span className="material-symbols-outlined text-[26px]">person_alert</span>
                    </div>
                  </div>
                </div>

                {/* Directory Section */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
                  {/* Toolbar */}
                  <div className="p-4 border-b border-outline-variant flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-h3 text-h3 text-on-surface font-bold">Реестр учеников</h3>
                      <span className="bg-surface-container px-2.5 py-0.5 rounded-full font-label-sm text-xs text-on-surface-variant font-bold">
                        {filteredStudents.length} Всего
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={selectedGroup}
                        onChange={(e) => {
                          setSelectedGroup(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-md text-sm text-on-surface-variant focus:ring-primary focus:border-primary"
                      >
                        <option>Все группы</option>
                        <option>Основы математики</option>
                        <option>Творческое письмо A</option>
                        <option>Продвинутая физика</option>
                      </select>

                      <select
                        value={selectedStatus}
                        onChange={(e) => {
                          setSelectedStatus(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-label-md text-sm text-on-surface-variant focus:ring-primary focus:border-primary"
                      >
                        <option>Все статусы</option>
                        <option>Активен</option>
                        <option>Истекает</option>
                        <option>Просрочен</option>
                      </select>

                      <button onClick={() => showToast("Дополнительные фильтры будут добавлены в следующей итерации")} className="flex items-center gap-2 border border-outline-variant bg-surface px-3 py-1.5 rounded-lg font-label-md text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Фильтры
                      </button>
                      <button onClick={() => showToast("Экспорт реестра учеников в CSV")} className="p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-surface-bright border-b border-outline-variant font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3 font-semibold">Имя ученика</th>
                          <th className="px-6 py-3 font-semibold">Имя родителя</th>
                          <th className="px-6 py-3 font-semibold">Группы</th>
                          <th className="px-6 py-3 font-semibold text-center">Последнее посещение</th>
                          <th className="px-6 py-3 font-semibold">Подписка</th>
                          <th className="px-6 py-3 font-semibold text-right">Баланс</th>
                          <th className="px-6 py-3 w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant">
                        {paginatedStudents.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant">
                              Ничего не найдено по вашему запросу.
                            </td>
                          </tr>
                        ) : (
                          paginatedStudents.map((student) => (
                            <tr key={student.id} className="data-table-row transition-all duration-150 cursor-pointer group active:scale-[0.995]">
                              <td className="px-6 py-3">
                                <div className="flex items-center gap-3">
                                  <img className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" alt={student.name} src={student.avatar} />
                                  <div>
                                    <p className="font-body-md text-sm text-on-surface font-semibold">{student.name}</p>
                                    <p className="text-xs text-on-surface-variant">ID: {student.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-3">
                                <button onClick={() => showToast(`Информация о родителе ${student.parentName}`)} className="text-primary hover:underline font-body-md text-sm text-left">{student.parentName}</button>
                              </td>
                              <td className="px-6 py-3">
                                <div className="flex flex-wrap gap-1">
                                  {student.groups.map((grp, i) => (
                                    <span key={i} className="bg-surface-container px-2 py-0.5 rounded font-label-sm text-[10px] text-on-surface-variant font-medium">
                                      {grp}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-3 text-center">
                                <p className="font-body-md text-sm text-on-surface font-medium">{student.lastVisitDate}</p>
                                <p className={`font-label-sm text-xs font-semibold ${student.lastVisitStatus.includes("Присутствова") || student.lastVisitStatus === "Присутствовал"
                                  ? "text-emerald-600"
                                  : "text-error"
                                  }`}>
                                  {student.lastVisitStatus}
                                </p>
                              </td>
                              <td className="px-6 py-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${student.subscriptionStatus === "Активна"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : student.subscriptionStatus.startsWith("Истекает")
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-error-container text-error"
                                  }`}>
                                  {student.subscriptionStatus}
                                </span>
                              </td>
                              <td className="px-6 py-3 text-right">
                                <p className={`font-body-md text-sm font-bold ${student.balance > 10000 ? "text-error" : "text-on-surface"}`}>
                                  {student.balance.toLocaleString("ru-RU")} ₽
                                </p>
                              </td>
                              <td className="px-6 py-3 text-right">
                                <button
                                  onClick={() => showToast(`Действия для ${student.name}`)}
                                  className="p-1 opacity-0 group-hover:opacity-100 text-on-surface-variant hover:bg-surface-container rounded-lg transition-all"
                                >
                                  <span className="material-symbols-outlined">more_vert</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Control */}
                  {totalPages > 1 && (
                    <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-bright">
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        Показано с {((currentPage - 1) * itemsPerPage) + 1} по {Math.min(currentPage * itemsPerPage, filteredStudents.length)} из {filteredStudents.length} записей
                      </p>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40"
                        >
                          Назад
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1
                              ? "bg-primary text-on-primary shadow-sm"
                              : "hover:bg-surface-container-high"
                              }`}
                          >
                            {i + 1}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40"
                        >
                          Вперед
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Bento Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Attendance Trend Chart */}
                  <div className="lg:col-span-3 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-h3 text-h3 text-on-surface font-bold">Тренды посещаемости</h3>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1.5 font-label-sm text-xs text-on-surface-variant font-semibold">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                          Присутствие
                        </span>
                        <span className="flex items-center gap-1.5 font-label-sm text-xs text-on-surface-variant font-semibold">
                          <span className="w-2.5 h-2.5 rounded-full bg-error" />
                          Пропуски
                        </span>
                      </div>
                    </div>
                    {/* Visual bar graph representation */}
                    <div className="h-48 w-full flex items-end justify-between gap-3 px-2 pt-6">
                      {[
                        { day: "Пн", fill: "h-[85%]", attend: "90%" },
                        { day: "Вт", fill: "h-[70%]", attend: "85%" },
                        { day: "Ср", fill: "h-[90%]", attend: "92%" },
                        { day: "Чт", fill: "h-[80%]", attend: "88%" },
                        { day: "Пт", fill: "h-[95%]", attend: "96%" },
                        { day: "Сб", fill: "h-[60%]", attend: "75%" },
                        { day: "Вс", fill: "h-[85%]", attend: "90%" },
                      ].map((item, index) => (
                        <div key={index} className="w-full bg-primary/10 rounded-t-sm relative group flex flex-col justify-end" style={{ height: "100%" }}>
                          <div className={`absolute bottom-0 w-full bg-primary rounded-t-sm ${item.fill} transition-all duration-300 group-hover:brightness-110 shadow-sm`} />
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {item.attend}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 px-2">
                      {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => (
                        <span key={i} className="font-label-sm text-xs text-on-surface-variant font-semibold">{day}</span>
                      ))}
                    </div>
                  </div>

                  {/* Pending Tasks Panel */}
                  <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-h3 text-h3 text-on-surface font-bold mb-4">Ожидающие задачи</h3>
                      <div className="space-y-4">
                        {tasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-3">
                            <button
                              onClick={() => handleToggleTask(task.id)}
                              className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${task.completed
                                ? "bg-primary border-primary text-on-primary"
                                : "border-outline-variant hover:border-primary"
                                }`}
                            >
                              {task.completed && (
                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                              )}
                            </button>
                            <div className="flex-1">
                              <p className={`font-label-md text-xs font-semibold text-on-surface ${task.completed ? 'line-through text-on-surface-variant/60' : ''}`}>
                                {task.text}
                              </p>
                              {task.deadline && (
                                <p className="text-[10px] text-error font-semibold mt-0.5">Срок: {task.deadline}</p>
                              )}
                              {task.subtext && (
                                <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{task.subtext}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => showToast("Открытие полного списка задач")}
                      className="w-full mt-6 text-center py-2 border border-outline-variant rounded-lg font-label-md text-xs font-bold text-primary hover:bg-surface-container-low transition-all"
                    >
                      Все задачи ({tasks.filter(t => !t.completed).length})
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </main>
      </div>

      {/* MODAL 1: ADD STUDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-outline-variant rounded-2xl w-full max-w-lg shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_add</span>
              Добавить нового ученика
            </h3>
            <p className="text-xs text-on-surface-variant mb-5">Заполните поля ниже, чтобы зарегистрировать нового ученика в базе.</p>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">ФИО Ученика *</label>
                <input
                  required
                  type="text"
                  placeholder="Например: Иван Иванов"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">ФИО Родителя *</label>
                <input
                  required
                  type="text"
                  placeholder="Например: Анна Иванова"
                  value={newStudent.parentName}
                  onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                  className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Группа</label>
                  <select
                    value={newStudent.group}
                    onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
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
                    value={newStudent.subscriptionStatus}
                    onChange={(e) => setNewStudent({ ...newStudent, subscriptionStatus: e.target.value })}
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
                  value={newStudent.balance}
                  onChange={(e) => setNewStudent({ ...newStudent, balance: e.target.value })}
                  className="w-full px-3.5 py-2 border border-outline-variant bg-surface-container-low rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
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
      )}

      {/* MODAL 2: PAYMENT DETAILS VIEW */}
      {selectedPaymentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-outline-variant rounded-2xl w-full max-w-md shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPaymentDetail(null)}
              className="absolute right-4 top-4 p-1 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="material-symbols-outlined text-tertiary">receipt_long</span>
              Детали транзакции
            </h3>

            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Статус:</span>
                <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase ${selectedPaymentDetail.status === "Оплачено"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-error-container text-error"
                  }`}>
                  {selectedPaymentDetail.status}
                </span>
              </div>
              <div className="flex justify-between border-b border-outline-variant pb-2">
                <span className="text-on-surface-variant">Сумма:</span>
                <span className="font-bold text-on-surface">{selectedPaymentDetail.amount.toLocaleString("ru-RU")} ₸</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant pb-2">
                <span className="text-on-surface-variant">Плательщик (Ученик):</span>
                <span className="font-semibold text-on-surface">{selectedPaymentDetail.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant pb-2">
                <span className="text-on-surface-variant">Дата проведения:</span>
                <span className="text-on-surface font-medium">{selectedPaymentDetail.date}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant pb-2">
                <span className="text-on-surface-variant">Тип транзакции:</span>
                <span className="text-on-surface font-medium">Безналичный расчет (Kaspi QR)</span>
              </div>
            </div>

            <div className="flex justify-end pt-4 mt-6 border-t border-outline-variant">
              <button
                onClick={() => {
                  setSelectedPaymentDetail(null);
                  showToast("Чек отправлен родителю на WhatsApp");
                }}
                className="w-full py-2 bg-primary text-on-primary rounded-xl font-semibold text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                Отправить чек
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
