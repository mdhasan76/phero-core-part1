import {
  SemesterRegistration,
  SemesterRegistrationStatus,
  StudentSemesterRegistration,
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

const getAll = async (): Promise<SemesterRegistration[]> => {
  const result = await prisma.semesterRegistration.findMany();
  return result;
};

const startMyRegistration = async (
  userId: string
): Promise<{
  semesterRegistration: SemesterRegistration | null;
  studentSemesterRegistration: StudentSemesterRegistration;
}> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: userId,
    },
  });
  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student info not found!');
  }

  const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          SemesterRegistrationStatus.ONGOING,
          SemesterRegistrationStatus.UPCOMING,
        ],
      },
    },
  });

  if (
    semesterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMING
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Registration not started yet');
  }
  let studentSemesterRegistration;

  studentSemesterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistration: {
          id: semesterRegistrationInfo?.id,
        },
        studentId: studentInfo.id,
      },
    });
  if (!studentSemesterRegistration) {
    studentSemesterRegistration =
      await prisma.studentSemesterRegistration.create({
        data: {
          semesterRegistration: {
            connect: {
              id: semesterRegistrationInfo?.id,
            },
          },
          student: {
            connect: {
              id: studentInfo.id,
            },
          },
        },
      });
  }
  return {
    semesterRegistration: semesterRegistrationInfo,
    studentSemesterRegistration,
  };
};

export const SemesterRegistrationService = {
  insertToDB,
  getAll,
  startMyRegistration,
};
