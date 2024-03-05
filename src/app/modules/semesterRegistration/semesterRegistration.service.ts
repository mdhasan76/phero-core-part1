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

const enrollIntoCourse = async (
  studentId: string,
  payload: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }
) => {
  const student = await prisma.student.findFirst({
    where: {
      studentId,
    },
  });
  if (!student) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student not found');
  }

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  if (!semesterRegistration) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is no ongoing course');
  }

  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: {
      id: payload.offeredCourseSectionId,
    },
  });
  if (!offeredCourseSection) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Offered course section not found!'
    );
  }

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  if (!offeredCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offer course not found');
  }

  if (
    offeredCourseSection.currentlyEnrolledStudents >=
    offeredCourseSection.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student Capacity is full!');
  }

  await prisma.$transaction(async transactionClient => {
    const enrollCourse =
      await transactionClient.studentSemesterRegistrationCourse.create({
        data: {
          offeredCourseId: payload.offeredCourseId,
          offeredCourseSectionId: payload.offeredCourseSectionId,
          studentId: student.id,
          semesterRegistrationId: semesterRegistration.id,
        },
      });
    if (!enrollCourse) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to enroll course');
    }

    // update offered course section
    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudents: {
          increment: 1,
        },
      },
    });

    // update offered course
    await transactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      data: {
        totalCreditsTaken: {
          increment: offeredCourse.course.credits,
        },
      },
    });
  });
  return { message: 'Successfully enrolled into course' };
};

const withdrawFromCourse = async (
  studentId: string,
  payload: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }
) => {
  const student = await prisma.student.findFirst({
    where: {
      studentId,
    },
  });
  if (!student) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student not found');
  }

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  if (!semesterRegistration) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is no ongoing course');
  }

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  if (!offeredCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offer course not found');
  }

  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentSemesterRegistrationCourse.delete({
      where: {
        semesterRegistrationId_studentId_offeredCourseId: {
          semesterRegistrationId: semesterRegistration.id,
          studentId: student.id,
          offeredCourseId: payload.offeredCourseId,
        },
      },
    });

    // update offered course section
    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudents: {
          decrement: 1,
        },
      },
    });

    // update offered course
    await transactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      data: {
        totalCreditsTaken: {
          decrement: offeredCourse.course.credits,
        },
      },
    });
  });
  return { message: 'Successfully withdraw from course' };
};

export const SemesterRegistrationService = {
  insertToDB,
  getAll,
  startMyRegistration,
  enrollIntoCourse,
  withdrawFromCourse,
};
