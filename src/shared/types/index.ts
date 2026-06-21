export interface Student {
  id: string;
  name: string;
  avatar: string;
  parentName: string;
  groups: string[];
  lastVisitDate: string;
  lastVisitStatus: "Присутствовал" | "Присутствовала" | "Отсутствовал (Уваж.)" | "Прогул (3+ дня)" | string;
  subscriptionStatus: "Активна" | "Истекает (3д)" | "Истекает (2д)" | "Просрочена" | string;
  balance: number;
}

export interface Payment {
  id: string;
  studentName: string;
  avatarInitials: string;
  amount: number;
  date: string;
  status: "Оплачено" | "Ошибка";
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  groupName: string;
  teacher: string;
  teacherAvatar?: string;
  room: string;
  status: "Идет" | "Ожидается" | "Завершено" | string;
  dayOfWeek: "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс";
}

export interface TaskItem {
  id: string;
  text: string;
  deadline?: string;
  subtext?: string;
  completed: boolean;
}

export interface GroupItem {
  id: string;
  name: string;
  subject: string;
  teacherName: string;
  teacherAvatar: string;
  schedule: string;
  room: string;
  studentsCount: number;
  maxStudents: number;
  status: "Активна" | "Набор закрыт" | string;
}

export interface ParentItem {
  id: string;
  name: string;
  avatar: string;
  childName: string;
  childId: string;
  phone: string;
  email: string;
  activeSub: boolean;
  balance: number;
}

export interface TeacherItem {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  phone: string;
  email: string;
  groupsCount: number;
  experience: string;
  status: "Активен" | "В отпуске" | string;
}


