import { TSchedule } from './offeredCourse.interface';

export const hasScheduleConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}:00`);

    // 10:30 - 12:30
    // 11:30 - 1.30
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};
