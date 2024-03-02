import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';

export const checkFacultyAvailable = async (
  data: OfferedCourseClassSchedule
) => {
  const alreadyFacultyOnDay = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
      faculty: {
        id: data.facultyId,
      },
    },
  });

  const existingSlots = alreadyFacultyOnDay.map(el => ({
    dayOfWeek: el.dayOfWeek,
    startTime: el.startTime,
    endTime: el.endTime,
  }));
  const newSlot = {
    dayOfWeek: data.dayOfWeek,
    startTime: data.startTime,
    endTime: data.endTime,
  };

  const hasConflict = hasTimeConflict(existingSlots, newSlot);
  if (hasConflict) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty already booked!');
  }
};
