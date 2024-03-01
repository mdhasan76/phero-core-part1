import { OfferedCourseClassSchedule } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertToDB = async (data: OfferedCourseClassSchedule) => {
  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      semesterRegistration: true,
      offeredCourseSection: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

export const OfferedCourseClassScheduleService = { insertToDB };
