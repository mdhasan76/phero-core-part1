import {
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertToDB = async (data: SemesterRegistration) => {
  const isGoingAnySemesterRegistrationOROngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          { status: SemesterRegistrationStatus.ONGOING },
          { status: SemesterRegistrationStatus.UPCOMING },
        ],
      },
    });

  if (isGoingAnySemesterRegistrationOROngoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Already Ongoing or upcoming another semester registration'
    );
  }

  const createSemesterRegistration = await prisma.semesterRegistration.create({
    data,
  });
  const result = await prisma.semesterRegistration.findFirst({
    where: {
      id: createSemesterRegistration?.id,
    },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

export const SemesterRegistrationService = { insertToDB };
