import { TPreRequisiteCourses } from './course.interface';
import { Course } from './course.model';

const isInvalidPrerequisiteCourse = async (
  preRequisiteCourses: Partial<TPreRequisiteCourses>[],
) => {
  for (const course of preRequisiteCourses) {
    const isValid = await Course.findById(course.course);
    if (!isValid) {
      return true;
    }
  }
  return false;
};

export const CourseUtils = {
  isInvalidPrerequisiteCourse,
};
