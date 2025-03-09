import { Router } from 'express';
import { StudentRoutes } from '../module/student/student.route';
import { UserRoutes } from '../module/user/user.route';
import { SemesterRoutes } from '../module/academicSemester/semester.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semesters',
    route: SemesterRoutes,
  },
];

// router.use('/students', StudentRoutes);
// router.use('/users', UserRoutes);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
