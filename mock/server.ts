import { Plugin } from 'vite';

// Helper for JWT generation to pass client-side jwtDecode
function base64url(str: string): string {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function generateMockJwt(userId: string): string {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const payload = JSON.stringify({
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + 3600 * 24, // 24 hours expiry
    roles: ['client']
  });
  return `${base64url(header)}.${base64url(payload)}.mocksignature`;
}

export function mockApiPlugin(): Plugin {
  // In-memory mock database state
  const userId = '35a8df2d-0588-4db8-b541-11d95c52c6f1';
  const schoolId = '11111111-1111-1111-1111-111111111111';
  const branchId = '22222222-2222-2222-2222-222222222222';
  const walletId = 'wallet-id-1';

  const db = {
    user: {
      id: userId,
      clientId: 'client-id-123',
      username: 'ivan_student',
      description: 'Ученик курса по Scratch',
      firstName: 'Иван',
      lastName: 'Иванов',
      roles: ['client'],
      avatar: {
        name: 'avatar.png',
        size: 1024,
        url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'
      },
      schoolId: schoolId,
      notificationCount: 2,
      language: 'ru'
    },
    studentProfile: {
      id: userId,
      username: 'ivan_student',
      description: 'Ученик курса по Scratch',
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@example.com',
      avatar: {
        name: 'avatar.png',
        size: 1024,
        url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'
      },
      schoolId: schoolId,
      clientId: 'client-id-123',
      totalPoints: 250,
      pointWallets: [
        {
          id: walletId,
          name: 'Основной кошелек',
          balance: 250,
          pointType: {
            id: 'point-type-id-1',
            name: 'EduCoin',
            schoolId: schoolId
          }
        }
      ],
      notificationCount: 2,
      language: 'ru'
    },
    groups: [
      {
        id: 'group-id-1',
        name: 'Младшая группа программирования (Scratch-1)',
        description: 'Обучение основам Scratch, логике и алгоритмам.',
        schoolId: schoolId,
        branchId: branchId,
        pointType: {
          id: 'point-type-id-1',
          name: 'EduCoin',
          schoolId: schoolId
        }
      }
    ],
    groupCourses: [
      {
        id: 'group-course-id-1',
        course: {
          id: 'course-id-1',
          name: 'Программирование на Scratch',
          description: 'Создание игр и анимаций в среде Scratch',
          schoolId: schoolId
        },
        groupId: 'group-id-1',
        schoolId: schoolId,
        teacher: {
          id: 'teacher-id-1',
          username: 'alex_teacher',
          firstName: 'Алексей',
          lastName: 'Петров',
          roles: ['teacher'],
          schoolId: schoolId,
          notificationCount: 0,
          language: 'ru'
        },
        completedAt: null
      }
    ],
    scheduledLessons: [
      {
        id: 'lesson-id-2',
        groupCourseId: 'group-course-id-1',
        startAt: new Date(Date.now() - 3600 * 24 * 1000 * 4).toISOString(), // 4 days ago
        isActive: true,
        lesson: {
          id: 'inner-lesson-id-2',
          name: 'Урок 1: Знакомство со Scratch',
          description: 'Знакомство со средой Scratch, спрайтами и координатами',
          order: 1,
          schoolId: schoolId,
          courseId: 'course-id-1'
        },
        lessonSnapshot: {
          name: 'Знакомство со Scratch',
          description: 'На этом уроке мы разберем интерфейс Scratch, научимся добавлять спрайты и программировать их движения.'
        },
        schoolId: schoolId,
        teacherId: 'teacher-id-1'
      },
      {
        id: 'lesson-id-1',
        groupCourseId: 'group-course-id-1',
        startAt: new Date(Date.now() - 3600 * 24 * 1000 * 1).toISOString(), // 1 day ago
        isActive: true,
        lesson: {
          id: 'inner-lesson-id-1',
          name: 'Урок 2: Циклы и Условия',
          description: 'Изучение базовых алгоритмических конструкций',
          order: 2,
          schoolId: schoolId,
          courseId: 'course-id-1'
        },
        lessonSnapshot: {
          name: 'Урок 2: Циклы и Условия',
          description: 'На этом уроке мы научимся использовать блоки "всегда", "повторить" и ветвления "если-то".'
        },
        schoolId: schoolId,
        teacherId: 'teacher-id-1'
      }
    ],
    scheduledAssignments: [
      {
        id: 'sched-assignment-id-2',
        scheduledLessonId: 'lesson-id-2',
        assignment: {
          id: 'assignment-id-2',
          name: 'ДЗ 1: Движение по экрану',
          schoolId: schoolId
        },
        assignmentSnapshot: {
          name: 'ДЗ 1: Движение по экрану',
          description: 'Создайте персонажа, который ходит за стрелками на клавиатуре и не выходит за границы экрана.'
        },
        studentAssignmentSubmission: {
          id: 'submission-id-2',
          status: 'evaluated', // Checked
          grade: 10,
          description: 'Я сделал движение кота во все стороны!',
          createdAt: new Date(Date.now() - 3600 * 24 * 1000 * 3).toISOString()
        }
      },
      {
        id: 'sched-assignment-id-1',
        scheduledLessonId: 'lesson-id-1',
        assignment: {
          id: 'assignment-id-1',
          name: 'ДЗ 2: Погоня за мышкой (с циклами)',
          schoolId: schoolId
        },
        assignmentSnapshot: {
          name: 'ДЗ 2: Погоня за мышкой (с циклами)',
          description: 'Создайте игру, где один персонаж (Кот) гоняется за вторым (Мышь), управляемым случайными движениями в цикле.'
        },
        studentAssignmentSubmission: null // Not submitted yet
      }
    ],
    studyMaterials: [
      {
        id: 'material-id-1',
        name: 'Презентация к уроку 2',
        schoolId: schoolId,
        assignmentId: 'assignment-id-1',
        materialFile: {
          name: 'lesson2_loops_and_conditions.pdf',
          size: 2048576,
          url: 'https://pdfobject.com/pdf/sample.pdf'
        }
      }
    ],
    submissions: [] as any[],
    submissionMaterials: {} as Record<string, any[]>,
    notifications: [
      {
        id: 'notification-id-1',
        title: 'Задание проверено',
        message: 'Преподаватель проверил ваше Домашнее задание №1 и поставил оценку 10!',
        createdAt: new Date(Date.now() - 3600 * 24 * 1000 * 3).toISOString(),
        readAt: null as string | null
      },
      {
        id: 'notification-id-2',
        title: 'Новое домашнее задание',
        message: 'Вам выдано домашнее задание по Уроку 2: Циклы и Условия.',
        createdAt: new Date(Date.now() - 3600 * 24 * 1000 * 1).toISOString(),
        readAt: null as string | null
      }
    ],
    transactions: [
      {
        id: 'transaction-id-1',
        amount: 50,
        description: 'Начисление за выполнение ДЗ №1',
        createdAt: new Date(Date.now() - 3600 * 24 * 1000 * 3).toISOString()
      },
      {
        id: 'transaction-id-2',
        amount: 200,
        description: 'Приветственный бонус при регистрации',
        createdAt: new Date(Date.now() - 3600 * 24 * 1000 * 10).toISOString()
      }
    ]
  };

  return {
    name: 'vite-plugin-mock-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        // Standardize request URL relative to localhost
        const url = new URL(req.url, 'http://localhost');
        const pathname = url.pathname;
        const method = req.method?.toUpperCase();

        // Intercept only /api/v1/ prefix
        if (pathname.startsWith('/api/v1')) {
          const apiPath = pathname.slice('/api/v1'.length);

          // CORS Headers
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Access-Control-Allow-Methods', '*');
          res.setHeader('Content-Type', 'application/json');

          if (method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          // Parse POST/PUT/PATCH body
          let body: any = {};
          if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            const buffers: Buffer[] = [];
            for await (const chunk of req) {
              buffers.push(chunk as Buffer);
            }
            const data = Buffer.concat(buffers).toString();
            try {
              if (data) body = JSON.parse(data);
            } catch (e) {}
          }

          // ROUTING

          // Health Check
          if (apiPath === '/health' && method === 'GET') {
            res.end(JSON.stringify({ status: 'ok' }));
            return;
          }

          // Login
          if (apiPath === '/auth/login' && method === 'POST') {
            res.end(JSON.stringify({
              access: generateMockJwt(userId),
              refresh: 'mock-refresh-token'
            }));
            return;
          }

          // Logout
          if (apiPath === '/auth/logout' && method === 'POST') {
            res.statusCode = 204;
            res.end();
            return;
          }

          // Refresh Token
          if (apiPath === '/auth/refresh' && method === 'POST') {
            res.end(JSON.stringify({
              access: generateMockJwt(userId),
              refresh: 'mock-refresh-token'
            }));
            return;
          }

          // Get User Student
          if (apiPath === `/users/${userId}/student` && method === 'GET') {
            res.end(JSON.stringify(db.studentProfile));
            return;
          }

          // Update User Profile (first name / last name)
          if (apiPath === `/users/${userId}` && method === 'PUT') {
            db.studentProfile.firstName = body.firstName || db.studentProfile.firstName;
            db.studentProfile.lastName = body.lastName || db.studentProfile.lastName;
            db.user.firstName = body.firstName || db.user.firstName;
            db.user.lastName = body.lastName || db.user.lastName;
            res.end(JSON.stringify(db.user));
            return;
          }

          // Get User General
          if (apiPath === `/users/${userId}` && method === 'GET') {
            res.end(JSON.stringify(db.user));
            return;
          }

          // Update Avatar (Request PUT link)
          if (apiPath === `/users/${userId}/avatar` && method === 'POST') {
            res.end(JSON.stringify({
              putLink: '/api/v1/mock-avatar-upload'
            }));
            return;
          }

          // Handle PUT Avatar Upload
          if (apiPath === '/mock-avatar-upload' && method === 'PUT') {
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
            return;
          }

          // Get User Groups
          if (apiPath === '/groups' && method === 'GET') {
            res.end(JSON.stringify({
              items: db.groups,
              metadata: { page: 1, totalPages: 1, totalItems: db.groups.length }
            }));
            return;
          }

          // Get Group Courses
          if (apiPath === '/group-courses' && method === 'GET') {
            res.end(JSON.stringify({
              items: db.groupCourses,
              metadata: { page: 1, totalPages: 1, totalItems: db.groupCourses.length }
            }));
            return;
          }

          // Get specific Group Course
          const groupCourseMatch = apiPath.match(/^\/group-courses\/([a-zA-Z0-9\-]+)$/);
          if (groupCourseMatch && method === 'GET') {
            const course = db.groupCourses.find(c => c.id === groupCourseMatch[1]) || db.groupCourses[0];
            res.end(JSON.stringify(course));
            return;
          }

          // Get Scheduled Lessons
          if (apiPath === '/scheduled-lessons' && method === 'GET') {
            res.end(JSON.stringify({
              items: db.scheduledLessons,
              metadata: { page: 1, totalPages: 1, totalItems: db.scheduledLessons.length }
            }));
            return;
          }

          // Get Student Schedule (Calendar)
          if (apiPath === '/scheduled-lessons/schedule/students' && method === 'GET') {
            // Map scheduled lessons to StudentSchedule format
            const studentSchedules = db.scheduledLessons.map(lesson => ({
              course: db.groupCourses[0].course,
              scheduledLesson: lesson
            }));
            res.end(JSON.stringify({
              items: studentSchedules,
              metadata: { page: 1, totalPages: 1, totalItems: studentSchedules.length }
            }));
            return;
          }

          // Get Scheduled Assignments
          if (apiPath === '/scheduled-assignments' && method === 'GET') {
            const lessonId = url.searchParams.get('scheduledLessonId');
            const filteredAssignments = lessonId
              ? db.scheduledAssignments.filter(a => a.scheduledLessonId === lessonId)
              : db.scheduledAssignments;

            res.end(JSON.stringify({
              items: filteredAssignments,
              metadata: { page: 1, totalPages: 1, totalItems: filteredAssignments.length }
            }));
            return;
          }

          // Get Study Materials
          if (apiPath === '/study-materials' && method === 'GET') {
            res.end(JSON.stringify({
              items: db.studyMaterials,
              metadata: { page: 1, totalPages: 1, totalItems: db.studyMaterials.length }
            }));
            return;
          }

          // Get Assignment Submissions
          if (apiPath === '/assignment-submissions' && method === 'GET') {
            const scheduledAssignmentId = url.searchParams.get('scheduledAssignmentId');
            
            // Look up in our submitted list, or generate dummy if we just submitted it
            const matchedSubmissions = db.submissions.filter(s => s.scheduledAssignmentId === scheduledAssignmentId);
            
            // Check if there is a pre-existing evaluated one in the assignment database
            const staticAssignment = db.scheduledAssignments.find(a => a.id === scheduledAssignmentId);
            if (staticAssignment?.studentAssignmentSubmission && matchedSubmissions.length === 0) {
              matchedSubmissions.push({
                id: staticAssignment.studentAssignmentSubmission.id,
                scheduledAssignmentId: staticAssignment.id,
                status: staticAssignment.studentAssignmentSubmission.status,
                grade: staticAssignment.studentAssignmentSubmission.grade,
                description: staticAssignment.studentAssignmentSubmission.description,
                createdAt: staticAssignment.studentAssignmentSubmission.createdAt,
                schoolId: schoolId
              });
            }

            res.end(JSON.stringify({
              items: matchedSubmissions,
              metadata: { page: 1, totalPages: 1, totalItems: matchedSubmissions.length }
            }));
            return;
          }

          // Create Assignment Submission
          if (apiPath === '/assignment-submissions' && method === 'POST') {
            const newSubmission = {
              id: `submission-id-${Date.now()}`,
              scheduledAssignmentId: body.scheduledAssignmentId,
              status: 'attached', // Under review
              description: body.description || '',
              createdAt: new Date().toISOString(),
              schoolId: body.schoolId || schoolId
            };

            db.submissions.push(newSubmission);
            db.submissionMaterials[newSubmission.id] = [];

            // Update assignment status locally
            const targetAssignment = db.scheduledAssignments.find(a => a.id === body.scheduledAssignmentId);
            if (targetAssignment) {
              targetAssignment.studentAssignmentSubmission = {
                id: newSubmission.id,
                status: 'attached',
                description: newSubmission.description,
                createdAt: newSubmission.createdAt,
                grade: null as any
              } as any;
            }

            res.end(JSON.stringify(newSubmission));
            return;
          }

          // Create Assignment Submission Material (File Attachment)
          if (apiPath === '/assignment-submissions/materials' && method === 'POST') {
            const submissionId = body.submissionId;
            const newMaterial = {
              id: `material-id-${Date.now()}`,
              submissionId: submissionId,
              name: body.name || 'attachment.png',
              schoolId: body.schoolId || schoolId,
              putLink: `/api/v1/mock-file-upload?name=${encodeURIComponent(body.name)}`
            };

            if (!db.submissionMaterials[submissionId]) {
              db.submissionMaterials[submissionId] = [];
            }
            db.submissionMaterials[submissionId].push({
              id: newMaterial.id,
              name: newMaterial.name,
              size: 2048,
              url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' // dummy URL
            });

            res.end(JSON.stringify(newMaterial));
            return;
          }

          // Handle PUT File Upload
          if (apiPath === '/mock-file-upload' && method === 'PUT') {
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
            return;
          }

          // Get Submission Materials
          const submissionMaterialsMatch = apiPath.match(/^\/assignment-submissions\/([a-zA-Z0-9\-]+)\/materials$/);
          if (submissionMaterialsMatch && method === 'GET') {
            const submissionId = submissionMaterialsMatch[1];
            const materials = db.submissionMaterials[submissionId] || [];
            res.end(JSON.stringify({
              items: materials,
              metadata: { page: 1, totalPages: 1, totalItems: materials.length }
            }));
            return;
          }

          // Get Notifications
          if (apiPath === '/notifications' && method === 'GET') {
            res.end(JSON.stringify({
              items: db.notifications,
              metadata: { page: 1, totalPages: 1, totalItems: db.notifications.length }
            }));
            return;
          }

          // Mark Notification as read
          const readNotificationMatch = apiPath.match(/^\/notifications\/([a-zA-Z0-9\-]+)\/read$/);
          if (readNotificationMatch && method === 'POST') {
            const notif = db.notifications.find(n => n.id === readNotificationMatch[1]);
            if (notif) {
              notif.readAt = new Date().toISOString();
              // Decrease user notification count
              if (db.studentProfile.notificationCount > 0) db.studentProfile.notificationCount--;
              if (db.user.notificationCount > 0) db.user.notificationCount--;
            }
            res.statusCode = 204;
            res.end();
            return;
          }

          // Get Wallet Transactions
          const transactionsMatch = apiPath.match(/^\/users\/[a-zA-Z0-9\-]+\/student\/wallets\/[a-zA-Z0-9\-]+\/transactions$/);
          if (transactionsMatch && method === 'GET') {
            res.end(JSON.stringify({
              items: db.transactions,
              metadata: { page: 1, totalPages: 1, totalItems: db.transactions.length }
            }));
            return;
          }

          // If path starts with /api/v1 but isn't handled above
          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Mock endpoint not found: ${method} ${apiPath}` }));
          return;
        }

        // Pass-through other paths
        next();
      });
    }
  };
}
