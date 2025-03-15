import { Router } from 'express';
import { StudentRoutes } from '../module/student/student.route';
import { UserRoutes } from '../module/user/user.route';
import { SemesterRoutes } from '../module/academicSemester/semester.route';
import { AcademicFacultyRoutes } from '../module/academicFaculty/academicFaculty.route';
import { DepartMentRoutes } from '../module/academicDepartment/dept.route';
import { FacultyRoutes } from '../module/Faculty/faculty.route';
import { CourseRoutes } from '../module/course/course.route';
import { SemesterRegistrationRoutes } from '../module/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../module/OfferedCourse/offeredCourse.route';
import { AdminRoutes } from '../module/admin/admin.route';
import { AuthRoutes } from '../module/Auth/auth.route';

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
  {
    path: '/academicFaculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/departments',
    route: DepartMentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

// router.use('/students', StudentRoutes);
// router.use('/users', UserRoutes);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
