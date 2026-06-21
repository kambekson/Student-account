import React, { useState, useMemo } from "react";
import { Student, Payment, ScheduleItem, TaskItem, GroupItem, ParentItem, TeacherItem } from "@/shared/types";
import { Sidebar } from "@/widgets/Sidebar/ui/Sidebar";
import { Header } from "@/widgets/Header/ui/Header";
import { AddStudentModal } from "@/features/AddStudent/ui/AddStudentModal";
import { CreateGroupModal } from "@/features/CreateGroup/ui/CreateGroupModal";
import { CreateParentModal } from "@/features/CreateParent/ui/CreateParentModal";
import { CreateScheduleModal } from "@/features/CreateSchedule/ui/CreateScheduleModal";
import { CreatePaymentModal } from "@/features/CreatePayment/ui/CreatePaymentModal";
import { CreateTeacherModal } from "@/features/CreateTeacher/ui/CreateTeacherModal";
import { PaymentDetailModal } from "@/entities/Payment/ui/PaymentDetailModal";
import { DashboardPage } from "@/pages/Dashboard/ui/DashboardPage";
import { StudentsPage } from "@/pages/Students/ui/StudentsPage";
import { GroupsPage } from "@/pages/Groups/ui/GroupsPage";
import { ParentsPage } from "@/pages/Parents/ui/ParentsPage";
import { SchedulePage } from "@/pages/Schedule/ui/SchedulePage";
import { PaymentsPage } from "@/pages/Payments/ui/PaymentsPage";
import { TeachersPage } from "@/pages/Teachers/ui/TeachersPage";

const INITIAL_GROUPS: GroupItem[] = [
  {
    id: "g1",
    name: "Математика А-12",
    subject: "Точные науки",
    teacherName: "Алихан Смаилов",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD22yVyHFBbOWEDRETSap661rAdj_D2bDuZTcZ_H5fYWVwPuoGbRvDtKFZRfnSwnyHu7ehs7BtkkU_28XCYteJekRAumuUqxe0BMnZTj44BoGVP4AM8QX7B33TopVT45PYUs1UDq4XKn6RK0GFn-oDAE_cQoG8o7Pi_XoxIz5lcdh_Zytcrus6OT94v4O7H3V33DRAct-BtjGFc3BxZ0bi62-Vw3uJFLhaV1TWDzyegRpq3jmTxh3JvAO-yG4qtYu6fzlqHnLAjFNka",
    schedule: "Пн, Ср 16:00",
    room: "Каб. 402",
    studentsCount: 12,
    maxStudents: 15,
    status: "Активна",
  },
  {
    id: "g2",
    name: "Робототехника П-03",
    subject: "Технологии",
    teacherName: "Дамир Тлеуов",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeWI_GkSHQ0SF2rWzwh_7rDBZ4eyAYmfQTo_UNZ9i9nJyU6gkwNfdBfcxhVV3bxocvjE0Tdq8xHw1N4YglW72v2w_Y97ar282NHtlVqOMSfwShiyvMB3c2XaInYHSwsGcKgXIWrZB-DQgnIfk_O1VQv8UnfnRlor-8D1OFIy_1zWRxj80iSvWQsOeCutTw5YMhATNAHCSkOTfQnXmKd7-NR4QErzQ2fTQUKqTs-sjVJvxeVvjaD2hPTfD-tuXbG9C2Xj3HlmjAk0Jg",
    schedule: "Вт, Чт 18:30",
    room: "Лаб. 1",
    studentsCount: 10,
    maxStudents: 10,
    status: "Набор закрыт",
  },
  {
    id: "g3",
    name: "Английский B2-01",
    subject: "Языки",
    teacherName: "Елена Воронова",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq-2boi6gl7uWegpjFjsgW1-vDSHU4LJO2Mc3pfqGMpcBRp6RUpZbT_ytOGoKWjwOF2hXRgds3zLSqm3UiGF5KGFlQgnsO_MEY6q2WWhjSIsgRsIoI2enV7GbPIiZJlGJeIaBmkB_ESvbL1jJWHDXbooF0E823AFt3R9feWckzs2FU0lj7gbcQqPX1tEeeCWnIHjvndY7CvROrHVzFOCv4aBAzsWUM1Ppj0_CSombi2Oo_ANHkKqJuIwVeK1_vRTiCjZ0_S0maVIPg",
    schedule: "Пн, Ср, Пт 10:00",
    room: "Каб. 215",
    studentsCount: 6,
    maxStudents: 12,
    status: "Активна",
  },
  {
    id: "g4",
    name: "Подготовка к ОРТ",
    subject: "Экзамены",
    teacherName: "Сергей Ким",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEyufb4pAFylR95Sej0C_BX3n2BZzq7tCSxRQtHw_r2hfd-3-a2cukG-eUOATQocJ_EgGy9XJyIQLGkXfN0oANpDpemwstpeo-CKcBpM2k8IlMqLE6H0m499ekpN2b-Tyhr1h2YG6ZRMALZV0389u7x3NPvbBrGsKLN9W1WxW_ebf-D5r2IgkP6lhc3zm_qCc_n2T1rGugXKpPjMritunPU8Bv4peoPhV5dI0TA8IEqIdRRz0gEqt9e3fyxSFT-aBhiwcT8Hs8_tF7",
    schedule: "Суббота 09:00",
    room: "Актовый зал",
    studentsCount: 18,
    maxStudents: 25,
    status: "Активна",
  },
];

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
  },
];

const INITIAL_PARENTS: ParentItem[] = [
  {
    id: "#PR-4401",
    name: "Элеонора Стерлинг",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH1AgpvQVD2EjyPsPlvCnGId75ANTd79R5eZi2ELMOu5Q8eg8w4PE5BkPrbsKkGLQRvyc-V1P41XO6eng7Aj0G43ihqcl3qfPcooLLuwGIkTKOFWT2K67isgwDYwzHt-UgX0-Lh2enNBbdOTdjbPc5Km2DnPMVrIu4_Br9sFALdWZBC3t7KylSZMVtLhE2Uz9W1-InzbIeDin1kL2bnD_yVeTYWZw7SvYrJasCn0Kb_6P3yuaX154UhNTQIA88I44oWB0lm36JiAZL",
    childName: "Юлиан Стерлинг",
    childId: "#ST-8821",
    phone: "+7 (701) 555-0121",
    email: "e.sterling@example.com",
    activeSub: true,
    balance: 0,
  },
  {
    id: "#PR-4402",
    name: "Давид Окафор",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3-EAcxl9Wb8jo_5qGvnO-po-0k1aZaFY8SzVz1Fbt1tLrMOeF0pF-mu4MD8p0WLGNGrGVFo7VehHXQSIa7G_FLSt_5yvC6WgS4E6EJlkwBSqf4yAU7lbDtogu66AVUxEcg2F5V2YHn7jrYa1jMJB2eNp7anMCWjyABy4Z13N2IephPL15q5loRuIvbAv0V4LNO-BIqsPNl-KI8Xs1mk5s6ZpSeZsjXNlm88ALmj-jJLZnCwVUUJhBPa_yMVQ4WF2m8uRXPBJGhYa9",
    childName: "Амара Окафор",
    childId: "#ST-8822",
    phone: "+7 (705) 998-3344",
    email: "d.okafor@example.com",
    activeSub: true,
    balance: 8500,
  },
  {
    id: "#PR-4403",
    name: "Сара Вэнс",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq-2boi6gl7uWegpjFjsgW1-vDSHU4LJO2Mc3pfqGMpcBRp6RUpZbT_ytOGoKWjwOF2hXRgds3zLSqm3UiGF5KGFlQgnsO_MEY6q2WWhjSIsgRsIoI2enV7GbPIiZJlGJeIaBmkB_ESvbL1jJWHDXbooF0E823AFt3R9feWckzs2FU0lj7gbcQqPX1tEeeCWnIHjvndY7CvROrHVzFOCv4aBAzsWUM1Ppj0_CSombi2Oo_ANHkKqJuIwVeK1_vRTiCjZ0_S0maVIPg",
    childName: "Лиам Вэнс",
    childId: "#ST-8823",
    phone: "+7 (777) 123-4567",
    email: "s.vance@example.com",
    activeSub: false,
    balance: 32000,
  },
  {
    id: "#PR-4404",
    name: "Ли Чжан",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEyufb4pAFylR95Sej0C_BX3n2BZzq7tCSxRQtHw_r2hfd-3-a2cukG-eUOATQocJ_EgGy9XJyIQLGkXfN0oANpDpemwstpeo-CKcBpM2k8IlMqLE6H0m499ekpN2b-Tyhr1h2YG6ZRMALZV0389u7x3NPvbBrGsKLN9W1WxW_ebf-D5r2IgkP6lhc3zm_qCc_n2T1rGugXKpPjMritunPU8Bv4peoPhV5dI0TA8IEqIdRRz0gEqt9e3fyxSFT-aBhiwcT8Hs8_tF7",
    childName: "Хлоя Чжан",
    childId: "#ST-8824",
    phone: "+7 (702) 441-2299",
    email: "l.zhang@example.com",
    activeSub: true,
    balance: 0,
  },
  {
    id: "#PR-4405",
    name: "Роберт Миллер",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeWI_GkSHQ0SF2rWzwh_7rDBZ4eyAYmfQTo_UNZ9i9nJyU6gkwNfdBfcxhVV3bxocvjE0Tdq8xHw1N4YglW72v2w_Y97ar282NHtlVqOMSfwShiyvMB3c2XaInYHSwsGcKgXIWrZB-DQgnIfk_O1VQv8UnfnRlor-8D1OFIy_1zWRxj80iSvWQsOeCutTw5YMhATNAHCSkOTfQnXmKd7-NR4QErzQ2fTQUKqTs-sjVJvxeVvjaD2hPTfD-tuXbG9C2Xj3HlmjAk0Jg",
    childName: "Алиса Миллер",
    childId: "#ST-8825",
    phone: "+7 (708) 887-1122",
    email: "r.miller@example.com",
    activeSub: true,
    balance: 0,
  },
  {
    id: "#PR-4406",
    name: "Хелен Райт",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcmTyW4FrQ4ydUnLYZO11aSS89GEekM3MsMz86oCZbecyc5FzBTURpIhWuZT7YIjVb86Y0yGWIqqCYR9eIIDmYZdjaxZuMXcNwsR0nKv2SuhaFgLfcWDP1pH-95osGaiMhisL7olA4V4w9179JxhFcLkP1Di4P3pvmB8Qnr-N5jsyvfdoRG3EEnUOfHPKcLJjeyMMAFwftGLE6PsSRoc09FPwB1t0VhemhAPW0JcDIvnOBsDxUMJ64ufro8VNSKOgHxWUIJk7QJEAX",
    childName: "Давид Райт",
    childId: "#ST-8826",
    phone: "+7 (747) 334-9988",
    email: "h.wright@example.com",
    activeSub: true,
    balance: 0,
  },
  {
    id: "#PR-4407",
    name: "Кен Чен",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2yVyHFBbOWEDRETSap661rAdj_D2bDuZTcZ_H5fYWVwPuoGbRvDtKFZRfnSwnyHu7ehs7BtkkU_28XCYteJekRAumuUqxe0BMnZTj44BoGVP4AM8QX7B33TopVT45PYUs1UDq4XKn6RK0GFn-oDAE_cQoG8o7Pi_XoxIz5lcdh_Zytcrus6OT94v4O7H3V33DRAct-BtjGFc3BxZ0bi62-Vw3uJFLhaV1TWDzyegRpq3jmTxh3JvAO-yG4qtYu6fzlqHnLAjFNka",
    childName: "Джейми Чен",
    childId: "#ST-8827",
    phone: "+7 (701) 980-0011",
    email: "k.chen@example.com",
    activeSub: true,
    balance: 0,
  },
  {
    id: "#PR-4408",
    name: "Хуан Мартинес",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-OodgvOEWL1kep8YrR4BzeIpsqKITfzAz_z3uFUVky1qrNeoPnNv4h3Squj5SZyNpUGezisk7tZnJ-gNCtUHdvUIn7bYqbe-ETKWMAOL5KK728S9e3KylZZTw_WcBDWcoTSpHavByCJcJjRHOL9NlSbpAGuO9jrCQtMvWebLRJTWJZxgT4C2xgGB47Jp1FOtqXpQGbmAJXyFsGCYk9dTnefi7WeMxZMOWfA4-VhZ4U2pLfhi-nkziqLFLizl71B6weIBhYb9v1IUI",
    childName: "София Мартинес",
    childId: "#ST-8828",
    phone: "+7 (705) 443-2211",
    email: "j.martinez@example.com",
    activeSub: true,
    balance: 4200,
  },
];

const INITIAL_PAYMENTS: Payment[] = [
  { id: "p1", studentName: "Алиса Миллер", avatarInitials: "АМ", amount: 350000, date: "12 окт. 2023", status: "Оплачено" },
  { id: "p2", studentName: "Давид Райт", avatarInitials: "ДР", amount: 120000, date: "11 окт. 2023", status: "Оплачено" },
  { id: "p3", studentName: "Хлоя Чжан", avatarInitials: "ХЧ", amount: 30000, date: "11 окт. 2023", status: "Ошибка" },
  { id: "p4", studentName: "Юлиан Стерлинг", avatarInitials: "ЮС", amount: 150000, date: "10 окт. 2023", status: "Оплачено" },
  { id: "p5", studentName: "Амара Окафор", avatarInitials: "АО", amount: 85000, date: "09 окт. 2023", status: "Оплачено" },
  { id: "p6", studentName: "Лиам Вэнс", avatarInitials: "ЛВ", amount: 45000, date: "08 окт. 2023", status: "Ошибка" },
  { id: "p7", studentName: "Джейми Чен", avatarInitials: "ДЧ", amount: 200000, date: "07 окт. 2023", status: "Оплачено" },
  { id: "p8", studentName: "София Мартинес", avatarInitials: "СМ", amount: 95000, date: "06 окт. 2023", status: "Оплачено" },
];

const INITIAL_TEACHERS: TeacherItem[] = [
  {
    id: "t1",
    name: "Алихан Смаилов",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD22yVyHFBbOWEDRETSap661rAdj_D2bDuZTcZ_H5fYWVwPuoGbRvDtKFZRfnSwnyHu7ehs7BtkkU_28XCYteJekRAumuUqxe0BMnZTj44BoGVP4AM8QX7B33TopVT45PYUs1UDq4XKn6RK0GFn-oDAE_cQoG8o7Pi_XoxIz5lcdh_Zytcrus6OT94v4O7H3V33DRAct-BtjGFc3BxZ0bi62-Vw3uJFLhaV1TWDzyegRpq3jmTxh3JvAO-yG4qtYu6fzlqHnLAjFNka",
    subject: "Точные науки",
    phone: "+7 (701) 111-2233",
    email: "a.smailov@example.com",
    groupsCount: 3,
    experience: "8 лет",
    status: "Активен",
  },
  {
    id: "t2",
    name: "Дамир Тлеуов",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeWI_GkSHQ0SF2rWzwh_7rDBZ4eyAYmfQTo_UNZ9i9nJyU6gkwNfdBfcxhVV3bxocvjE0Tdq8xHw1N4YglW72v2w_Y97ar282NHtlVqOMSfwShiyvMB3c2XaInYHSwsGcKgXIWrZB-DQgnIfk_O1VQv8UnfnRlor-8D1OFIy_1zWRxj80iSvWQsOeCutTw5YMhATNAHCSkOTfQnXmKd7-NR4QErzQ2fTQUKqTs-sjVJvxeVvjaD2hPTfD-tuXbG9C2Xj3HlmjAk0Jg",
    subject: "Технологии",
    phone: "+7 (705) 444-5566",
    email: "d.tleuov@example.com",
    groupsCount: 2,
    experience: "5 лет",
    status: "Активен",
  },
  {
    id: "t3",
    name: "Елена Воронова",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq-2boi6gl7uWegpjFjsgW1-vDSHU4LJO2Mc3pfqGMpcBRp6RUpZbT_ytOGoKWjwOF2hXRgds3zLSqm3UiGF5KGFlQgnsO_MEY6q2WWhjSIsgRsIoI2enV7GbPIiZJlGJeIaBmkB_ESvbL1jJWHDXbooF0E823AFt3R9feWckzs2FU0lj7gbcQqPX1tEeeCWnIHjvndY7CvROrHVzFOCv4aBAzsWUM1Ppj0_CSombi2Oo_ANHkKqJuIwVeK1_vRTiCjZ0_S0maVIPg",
    subject: "Языки",
    phone: "+7 (777) 888-9900",
    email: "e.voronova@example.com",
    groupsCount: 4,
    experience: "10 лет",
    status: "Активен",
  },
  {
    id: "t4",
    name: "Сергей Ким",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEyufb4pAFylR95Sej0C_BX3n2BZzq7tCSxRQtHw_r2hfd-3-a2cukG-eUOATQocJ_EgGy9XJyIQLGkXfN0oANpDpemwstpeo-CKcBpM2k8IlMqLE6H0m499ekpN2b-Tyhr1h2YG6ZRMALZV0389u7x3NPvbBrGsKLN9W1WxW_ebf-D5r2IgkP6lhc3zm_qCc_n2T1rGugXKpPjMritunPU8Bv4peoPhV5dI0TA8IEqIdRRz0gEqt9e3fyxSFT-aBhiwcT8Hs8_tF7",
    subject: "Экзамены",
    phone: "+7 (708) 555-4433",
    email: "s.kim@example.com",
    groupsCount: 1,
    experience: "12 лет",
    status: "В отпуске",
  },
];

const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: "s1",
    time: "09:00 - 10:30",
    title: "Высшая математика",
    groupName: "Математика А-12",
    teacher: "Алихан Смаилов",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD22yVyHFBbOWEDRETSap661rAdj_D2bDuZTcZ_H5fYWVwPuoGbRvDtKFZRfnSwnyHu7ehs7BtkkU_28XCYteJekRAumuUqxe0BMnZTj44BoGVP4AM8QX7B33TopVT45PYUs1UDq4XKn6RK0GFn-oDAE_cQoG8o7Pi_XoxIz5lcdh_Zytcrus6OT94v4O7H3V33DRAct-BtjGFc3BxZ0bi62-Vw3uJFLhaV1TWDzyegRpq3jmTxh3JvAO-yG4qtYu6fzlqHnLAjFNka",
    room: "Каб. 402",
    status: "Идет",
    dayOfWeek: "Пн",
  },
  {
    id: "s2",
    time: "11:00 - 12:30",
    title: "Творческое письмо",
    groupName: "Группа B-05",
    teacher: "Марк Томпсон",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEyufb4pAFylR95Sej0C_BX3n2BZzq7tCSxRQtHw_r2hfd-3-a2cukG-eUOATQocJ_EgGy9XJyIQLGkXfN0oANpDpemwstpeo-CKcBpM2k8IlMqLE6H0m499ekpN2b-Tyhr1h2YG6ZRMALZV0389u7x3NPvbBrGsKLN9W1WxW_ebf-D5r2IgkP6lhc3zm_qCc_n2T1rGugXKpPjMritunPU8Bv4peoPhV5dI0TA8IEqIdRRz0gEqt9e3fyxSFT-aBhiwcT8Hs8_tF7",
    room: "Библиотека",
    status: "Ожидается",
    dayOfWeek: "Пн",
  },
  {
    id: "s3",
    time: "14:00 - 15:30",
    title: "Введение в физику",
    groupName: "Группа C-01",
    teacher: "Д-р Елена Волкова",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeWI_GkSHQ0SF2rWzwh_7rDBZ4eyAYmfQTo_UNZ9i9nJyU6gkwNfdBfcxhVV3bxocvjE0Tdq8xHw1N4YglW72v2w_Y97ar282NHtlVqOMSfwShiyvMB3c2XaInYHSwsGcKgXIWrZB-DQgnIfk_O1VQv8UnfnRlor-8D1OFIy_1zWRxj80iSvWQsOeCutTw5YMhATNAHCSkOTfQnXmKd7-NR4QErzQ2fTQUKqTs-sjVJvxeVvjaD2hPTfD-tuXbG9C2Xj3HlmjAk0Jg",
    room: "Лаб. 1",
    status: "Ожидается",
    dayOfWeek: "Пн",
  },
  {
    id: "s4",
    time: "16:00 - 17:30",
    title: "Робототехника",
    groupName: "Робототехника П-03",
    teacher: "Дамир Тлеуов",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeWI_GkSHQ0SF2rWzwh_7rDBZ4eyAYmfQTo_UNZ9i9nJyU6gkwNfdBfcxhVV3bxocvjE0Tdq8xHw1N4YglW72v2w_Y97ar282NHtlVqOMSfwShiyvMB3c2XaInYHSwsGcKgXIWrZB-DQgnIfk_O1VQv8UnfnRlor-8D1OFIy_1zWRxj80iSvWQsOeCutTw5YMhATNAHCSkOTfQnXmKd7-NR4QErzQ2fTQUKqTs-sjVJvxeVvjaD2hPTfD-tuXbG9C2Xj3HlmjAk0Jg",
    room: "Лаб. 2",
    status: "Ожидается",
    dayOfWeek: "Вт",
  },
  {
    id: "s5",
    time: "18:30 - 20:00",
    title: "Английский B2",
    groupName: "Английский B2-01",
    teacher: "Елена Воронова",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq-2boi6gl7uWegpjFjsgW1-vDSHU4LJO2Mc3pfqGMpcBRp6RUpZbT_ytOGoKWjwOF2hXRgds3zLSqm3UiGF5KGFlQgnsO_MEY6q2WWhjSIsgRsIoI2enV7GbPIiZJlGJeIaBmkB_ESvbL1jJWHDXbooF0E823AFt3R9feWckzs2FU0lj7gbcQqPX1tEeeCWnIHjvndY7CvROrHVzFOCv4aBAzsWUM1Ppj0_CSombi2Oo_ANHkKqJuIwVeK1_vRTiCjZ0_S0maVIPg",
    room: "Каб. 215",
    status: "Ожидается",
    dayOfWeek: "Вт",
  },
  {
    id: "s6",
    time: "09:00 - 10:30",
    title: "Высшая математика",
    groupName: "Математика А-12",
    teacher: "Алихан Смаилов",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD22yVyHFBbOWEDRETSap661rAdj_D2bDuZTcZ_H5fYWVwPuoGbRvDtKFZRfnSwnyHu7ehs7BtkkU_28XCYteJekRAumuUqxe0BMnZTj44BoGVP4AM8QX7B33TopVT45PYUs1UDq4XKn6RK0GFn-oDAE_cQoG8o7Pi_XoxIz5lcdh_Zytcrus6OT94v4O7H3V33DRAct-BtjGFc3BxZ0bi62-Vw3uJFLhaV1TWDzyegRpq3jmTxh3JvAO-yG4qtYu6fzlqHnLAjFNka",
    room: "Каб. 402",
    status: "Завершено",
    dayOfWeek: "Ср",
  },
  {
    id: "s7",
    time: "11:00 - 12:30",
    title: "Английский B2",
    groupName: "Английский B2-01",
    teacher: "Елена Воронова",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq-2boi6gl7uWegpjFjsgW1-vDSHU4LJO2Mc3pfqGMpcBRp6RUpZbT_ytOGoKWjwOF2hXRgds3zLSqm3UiGF5KGFlQgnsO_MEY6q2WWhjSIsgRsIoI2enV7GbPIiZJlGJeIaBmkB_ESvbL1jJWHDXbooF0E823AFt3R9feWckzs2FU0lj7gbcQqPX1tEeeCWnIHjvndY7CvROrHVzFOCv4aBAzsWUM1Ppj0_CSombi2Oo_ANHkKqJuIwVeK1_vRTiCjZ0_S0maVIPg",
    room: "Каб. 215",
    status: "Идет",
    dayOfWeek: "Ср",
  },
  {
    id: "s8",
    time: "14:00 - 15:30",
    title: "Робототехника",
    groupName: "Робототехника П-03",
    teacher: "Дамир Тлеуов",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeWI_GkSHQ0SF2rWzwh_7rDBZ4eyAYmfQTo_UNZ9i9nJyU6gkwNfdBfcxhVV3bxocvjE0Tdq8xHw1N4YglW72v2w_Y97ar282NHtlVqOMSfwShiyvMB3c2XaInYHSwsGcKgXIWrZB-DQgnIfk_O1VQv8UnfnRlor-8D1OFIy_1zWRxj80iSvWQsOeCutTw5YMhATNAHCSkOTfQnXmKd7-NR4QErzQ2fTQUKqTs-sjVJvxeVvjaD2hPTfD-tuXbG9C2Xj3HlmjAk0Jg",
    room: "Лаб. 2",
    status: "Ожидается",
    dayOfWeek: "Чт",
  },
  {
    id: "s9",
    time: "16:00 - 17:30",
    title: "Английский B2",
    groupName: "Английский B2-01",
    teacher: "Елена Воронова",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq-2boi6gl7uWegpjFjsgW1-vDSHU4LJO2Mc3pfqGMpcBRp6RUpZbT_ytOGoKWjwOF2hXRgds3zLSqm3UiGF5KGFlQgnsO_MEY6q2WWhjSIsgRsIoI2enV7GbPIiZJlGJeIaBmkB_ESvbL1jJWHDXbooF0E823AFt3R9feWckzs2FU0lj7gbcQqPX1tEeeCWnIHjvndY7CvROrHVzFOCv4aBAzsWUM1Ppj0_CSombi2Oo_ANHkKqJuIwVeK1_vRTiCjZ0_S0maVIPg",
    room: "Каб. 215",
    status: "Ожидается",
    dayOfWeek: "Пт",
  },
  {
    id: "s10",
    time: "09:00 - 10:30",
    title: "Подготовка к ОРТ",
    groupName: "Подготовка к ОРТ",
    teacher: "Сергей Ким",
    teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEyufb4pAFylR95Sej0C_BX3n2BZzq7tCSxRQtHw_r2hfd-3-a2cukG-eUOATQocJ_EgGy9XJyIQLGkXfN0oANpDpemwstpeo-CKcBpM2k8IlMqLE6H0m499ekpN2b-Tyhr1h2YG6ZRMALZV0389u7x3NPvbBrGsKLN9W1WxW_ebf-D5r2IgkP6lhc3zm_qCc_n2T1rGugXKpPjMritunPU8Bv4peoPhV5dI0TA8IEqIdRRz0gEqt9e3fyxSFT-aBhiwcT8Hs8_tF7",
    room: "Актовый зал",
    status: "Ожидается",
    dayOfWeek: "Сб",
  },
];

const INITIAL_TASKS: TaskItem[] = [
  { id: "t1", text: "Выставить счет Амаре Окафор", deadline: "через 2ч", completed: false },
  { id: "t2", text: "Проверить док-ты Юлиана", subtext: "Ожидает загрузки", completed: false },
  { id: "t3", text: "Позвонить родителям Лиама", subtext: "Контроль пропусков", completed: false },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "students" | "groups" | "parents" | "schedule" | "payments" | "teachers">("dashboard");

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [groups, setGroups] = useState<GroupItem[]>(INITIAL_GROUPS);
  const [parents, setParents] = useState<ParentItem[]>(INITIAL_PARENTS);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [teachers, setTeachers] = useState<TeacherItem[]>(INITIAL_TEACHERS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Все группы");
  const [selectedStatus, setSelectedStatus] = useState("Все статусы");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isCreateParentModalOpen, setIsCreateParentModalOpen] = useState(false);
  const [isCreateScheduleModalOpen, setIsCreateScheduleModalOpen] = useState(false);
  const [isCreatePaymentModalOpen, setIsCreatePaymentModalOpen] = useState(false);
  const [isCreateTeacherModalOpen, setIsCreateTeacherModalOpen] = useState(false);
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState<Payment | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handleAddStudent = (studentData: {
    name: string;
    parentName: string;
    group: string;
    subscriptionStatus: string;
    balance: number;
  }) => {
    const nextId = `#ST-${8800 + students.length + 1}`;
    const newStudentObj: Student = {
      id: nextId,
      name: studentData.name,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcmTyW4FrQ4ydUnLYZO11aSS89GEekM3MsMz86oCZbecyc5FzBTURpIhWuZT7YIjVb86Y0yGWIqqCYR9eIIDmYZdjaxZuMXcNwsR0nKv2SuhaFgLfcWDP1pH-95osGaiMhisL7olA4V4w9179JxhFcLkP1Di4P3pvmB8Qnr-N5jsyvfdoRG3EEnUOfHPKcLJjeyMMAFwftGLE6PsSRoc09FPwB1t0VhemhAPW0JcDIvnOBsDxUMJ64ufro8VNSKOgHxWUIJk7QJEAX",
      parentName: studentData.parentName,
      groups: [studentData.group === "Основы математики" ? "Мат-Осн" : studentData.group === "Творческое письмо A" ? "Пис-А" : "Физ-Продв"],
      lastVisitDate: "Сегодня",
      lastVisitStatus: "Присутствовал",
      subscriptionStatus: studentData.subscriptionStatus,
      balance: studentData.balance,
    };

    setStudents([newStudentObj, ...students]);
    setIsAddModalOpen(false);
    showToast(`Ученик ${newStudentObj.name} успешно добавлен!`);
  };

  const handleCreateGroup = (groupData: {
    name: string;
    subject: string;
    teacherName: string;
    schedule: string;
    room: string;
    maxStudents: number;
  }) => {
    const nextId = `g${groups.length + 1}`;
    const newGroupObj: GroupItem = {
      id: nextId,
      name: groupData.name,
      subject: groupData.subject,
      teacherName: groupData.teacherName,
      teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeWI_GkSHQ0SF2rWzwh_7rDBZ4eyAYmfQTo_UNZ9i9nJyU6gkwNfdBfcxhVV3bxocvjE0Tdq8xHw1N4YglW72v2w_Y97ar282NHtlVqOMSfwShiyvMB3c2XaInYHSwsGcKgXIWrZB-DQgnIfk_O1VQv8UnfnRlor-8D1OFIy_1zWRxj80iSvWQsOeCutTw5YMhATNAHCSkOTfQnXmKd7-NR4QErzQ2fTQUKqTs-sjVJvxeVvjaD2hPTfD-tuXbG9C2Xj3HlmjAk0Jg",
      schedule: groupData.schedule,
      room: groupData.room,
      studentsCount: 0,
      maxStudents: groupData.maxStudents,
      status: "Активна",
    };

    setGroups([...groups, newGroupObj]);
    setIsCreateGroupModalOpen(false);
    showToast(`Группа ${newGroupObj.name} успешно создана!`);
  };

  const handleCreateParent = (parentData: {
    name: string;
    childName: string;
    phone: string;
    email: string;
    balance: number;
  }) => {
    const nextId = `#PR-${4400 + parents.length + 1}`;
    const newParentObj: ParentItem = {
      id: nextId,
      name: parentData.name,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcmTyW4FrQ4ydUnLYZO11aSS89GEekM3MsMz86oCZbecyc5FzBTURpIhWuZT7YIjVb86Y0yGWIqqCYR9eIIDmYZdjaxZuMXcNwsR0nKv2SuhaFgLfcWDP1pH-95osGaiMhisL7olA4V4w9179JxhFcLkP1Di4P3pvmB8Qnr-N5jsyvfdoRG3EEnUOfHPKcLJjeyMMAFwftGLE6PsSRoc09FPwB1t0VhemhAPW0JcDIvnOBsDxUMJ64ufro8VNSKOgHxWUIJk7QJEAX",
      childName: parentData.childName,
      childId: `#ST-${8800 + students.length + 1}`,
      phone: parentData.phone,
      email: parentData.email || "info@example.com",
      activeSub: true,
      balance: parentData.balance,
    };

    setParents([newParentObj, ...parents]);
    setIsCreateParentModalOpen(false);
    showToast(`Родитель ${newParentObj.name} успешно добавлен!`);
  };

  const handleCreateSchedule = (scheduleData: {
    title: string;
    groupName: string;
    teacher: string;
    dayOfWeek: "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс";
    time: string;
    room: string;
  }) => {
    const nextId = `s${schedule.length + 1}`;
    const newScheduleObj: ScheduleItem = {
      id: nextId,
      title: scheduleData.title,
      groupName: scheduleData.groupName,
      teacher: scheduleData.teacher,
      teacherAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEyufb4pAFylR95Sej0C_BX3n2BZzq7tCSxRQtHw_r2hfd-3-a2cukG-eUOATQocJ_EgGy9XJyIQLGkXfN0oANpDpemwstpeo-CKcBpM2k8IlMqLE6H0m499ekpN2b-Tyhr1h2YG6ZRMALZV0389u7x3NPvbBrGsKLN9W1WxW_ebf-D5r2IgkP6lhc3zm_qCc_n2T1rGugXKpPjMritunPU8Bv4peoPhV5dI0TA8IEqIdRRz0gEqt9e3fyxSFT-aBhiwcT8Hs8_tF7",
      room: scheduleData.room,
      status: "Ожидается",
      dayOfWeek: scheduleData.dayOfWeek,
      time: scheduleData.time,
    };

    setSchedule([...schedule, newScheduleObj]);
    setIsCreateScheduleModalOpen(false);
    showToast(`Занятие "${newScheduleObj.title}" успешно добавлено!`);
  };

  const handleCreatePayment = (paymentData: {
    studentName: string;
    amount: number;
    date: string;
    status: "Оплачено" | "Ошибка";
  }) => {
    const nextId = `p${payments.length + 1}`;
    const initials = paymentData.studentName
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .slice(0, 2);

    const newPaymentObj: Payment = {
      id: nextId,
      studentName: paymentData.studentName,
      avatarInitials: initials,
      amount: paymentData.amount,
      date: paymentData.date,
      status: paymentData.status,
    };

    setPayments([newPaymentObj, ...payments]);
    setIsCreatePaymentModalOpen(false);
    showToast(`Платеж для ${newPaymentObj.studentName} успешно проведен!`);
  };

  const handleCreateTeacher = (teacherData: {
    name: string;
    subject: string;
    experience: string;
    phone: string;
    email: string;
    status: "Активен" | "В отпуске" | string;
  }) => {
    const nextId = `t${teachers.length + 1}`;
    const newTeacherObj: TeacherItem = {
      id: nextId,
      name: teacherData.name,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcbp7rzBBh_FU81PA12ndHau7OGNz_tKEBm2klt4seDFqOkqbOdK-ovoZKno_RAbMuXIFAebFANC4btxU0Ge2jxGwJ2ue7htOsbjDvqpkfdjS8bxQwS9uBXvaytPrMWZJMGJJVZpQo_i_I-dT8WPmO2-Sv4ntiymVvvIGtmsWj1-xTv9u2NslQkkQFX0EJxJZhfRYf1_CW_Qyum86puYTC5W3b4cR7SDjhwGCRz1T7YFH8qG05VLhhg7cyr_hEmh8D0FmJBG4jhgNE",
      subject: teacherData.subject,
      phone: teacherData.phone,
      email: teacherData.email,
      groupsCount: 0,
      experience: teacherData.experience,
      status: teacherData.status,
    };

    setTeachers([...teachers, newTeacherObj]);
    setIsCreateTeacherModalOpen(false);
    showToast(`Преподаватель ${newTeacherObj.name} успешно добавлен!`);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

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

  const handleNavigateToStudents = (query: string) => {
    if (query === "Просрочен") {
      setSelectedStatus("Просрочен");
      setSearchQuery("");
    } else {
      setSearchQuery(query);
    }
    setActiveTab("students");
    setCurrentPage(1);
  };

  // Add click toggling based on tab
  const handleAddClick = () => {
    if (activeTab === "groups") {
      setIsCreateGroupModalOpen(true);
    } else if (activeTab === "parents") {
      setIsCreateParentModalOpen(true);
    } else if (activeTab === "schedule") {
      setIsCreateScheduleModalOpen(true);
    } else if (activeTab === "payments") {
      setIsCreatePaymentModalOpen(true);
    } else if (activeTab === "teachers") {
      setIsCreateTeacherModalOpen(true);
    } else {
      setIsAddModalOpen(true);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans select-none relative">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-outline/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Sidebar Widget */}
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} onShowToast={showToast} />

      {/* Main Container */}
      <div className="ml-[260px] flex flex-col min-h-screen">
        {/* Header Widget */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onAddClick={handleAddClick}
          onShowToast={showToast}
        />

        {/* Dynamic Pages */}
        <main className="flex-grow p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {activeTab === "dashboard" && (
              <DashboardPage
                students={students}
                payments={payments}
                schedule={schedule}
                onViewPayment={setSelectedPaymentDetail}
                onRenewSubscription={handleRenewSubscription}
                onShowToast={showToast}
                onNavigateToStudents={handleNavigateToStudents}
                onChangeTab={setActiveTab}
              />
            )}
            
            {activeTab === "students" && (
              <StudentsPage
                filteredStudents={filteredStudents}
                paginatedStudents={paginatedStudents}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                selectedGroup={selectedGroup}
                onGroupChange={setSelectedGroup}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onShowToast={showToast}
              />
            )}

            {activeTab === "groups" && (
              <GroupsPage
                groups={groups}
                searchQuery={searchQuery}
                onCreateClick={() => setIsCreateGroupModalOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === "parents" && (
              <ParentsPage
                parents={parents}
                searchQuery={searchQuery}
                onCreateClick={() => setIsCreateParentModalOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === "schedule" && (
              <SchedulePage
                schedule={schedule}
                onCreateClick={() => setIsCreateScheduleModalOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === "payments" && (
              <PaymentsPage
                payments={payments}
                searchQuery={searchQuery}
                onCreateClick={() => setIsCreatePaymentModalOpen(true)}
                onViewPayment={setSelectedPaymentDetail}
                onShowToast={showToast}
              />
            )}

            {activeTab === "teachers" && (
              <TeachersPage
                teachers={teachers}
                searchQuery={searchQuery}
                onCreateClick={() => setIsCreateTeacherModalOpen(true)}
                onShowToast={showToast}
              />
            )}
          </div>
        </main>
      </div>

      {/* AddStudent Feature Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStudent}
      />

      {/* CreateGroup Feature Modal */}
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onCreate={handleCreateGroup}
      />

      {/* CreateParent Feature Modal */}
      <CreateParentModal
        isOpen={isCreateParentModalOpen}
        onClose={() => setIsCreateParentModalOpen(false)}
        onCreate={handleCreateParent}
      />

      {/* CreateSchedule Feature Modal */}
      <CreateScheduleModal
        isOpen={isCreateScheduleModalOpen}
        onClose={() => setIsCreateScheduleModalOpen(false)}
        onCreate={handleCreateSchedule}
      />

      {/* CreatePayment Feature Modal */}
      <CreatePaymentModal
        isOpen={isCreatePaymentModalOpen}
        onClose={() => setIsCreatePaymentModalOpen(false)}
        onCreate={handleCreatePayment}
      />

      {/* CreateTeacher Feature Modal */}
      <CreateTeacherModal
        isOpen={isCreateTeacherModalOpen}
        onClose={() => setIsCreateTeacherModalOpen(false)}
        onCreate={handleCreateTeacher}
      />

      {/* Payment Details Entity Modal */}
      <PaymentDetailModal
        payment={selectedPaymentDetail}
        onClose={() => setSelectedPaymentDetail(null)}
        onSendReceipt={() => {
          setSelectedPaymentDetail(null);
          showToast("Чек отправлен родителю на WhatsApp");
        }}
      />
    </div>
  );
};

export default App;
