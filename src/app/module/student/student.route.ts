import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getStudents);
router.get('/:studentId', StudentControllers.getStudentById);
router.delete('/:studentId', StudentControllers.deleteStudent);
export const StudentRoutes = router;
