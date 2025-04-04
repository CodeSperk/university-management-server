import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';

const getStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentsFromDB(req.query);

  res.status(200).json({
    success: true,
    message: 'Students',
    meta: result.meta,
    data: result.data,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentByIdFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'Here is your student',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.updateStudentIntoDB(studentId, req.body);

  res.status(200).json({
    success: true,
    message: 'Students is updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'Student has been deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
};
