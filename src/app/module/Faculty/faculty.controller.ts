import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getFaculties = catchAsync(async (req, res) => {
  // console.log('test', req.user);
  const result = await FacultyServices.getFacultiesFromDB();
  res.status(200).json({
    success: true,
    message: 'Successfully retrived faculties',
    data: result,
  });
});
const getFacultiesById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getFacultiesByIdFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Found Faculty successfulll',
    data: result,
  });
});

const updateFacultyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.updateFacultyIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    message: 'updated Faculty',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Deleted Faculty',
    data: result,
  });
});

export const FacultyControllers = {
  getFaculties,
  getFacultiesById,
  updateFacultyById,
  deleteFaculty,
};
