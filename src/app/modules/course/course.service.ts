/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ICoursesData } from './course.interface';

// insert new data
const insertToDB = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...coursesData } = data;
  // console.log(data);

  const newCourse = await prisma.$transaction(async clientTransaction => {
    const result = await clientTransaction.course.create({ data: coursesData });

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      await asyncForEach(
        preRequisiteCourses,
        async (preRequisiteCourse: any) => {
          const createPrerequisite =
            await clientTransaction.courseToPrerequisite.create({
              data: {
                courseId: result.id,
                prerequisiteId: preRequisiteCourse.courseId,
              },
            });
          return createPrerequisite;
        }
      );
      // for (let index = 0; index < preRequisiteCourses.length; index++) {
      //   const createPrerequisite =
      //     await clientTransaction.courseToPrerequisite.create({
      //       data: {
      //         courseId: result.id,
      //         prerequisiteId: preRequisiteCourses[index].courseId,
      //       },
      //     });
      //   console.log(createPrerequisite);
      // }
    }
    return result;
  });
  // console.log(newCourse, 'hey');
  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        prerequisite: {
          include: {
            preRequisit: true,
          },
        },
        prerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
  // return newCourse;
};

const getAll = async () => {
  const result = await prisma.course.findMany();
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: ICoursesData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id: id,
      },
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePrerequisite = preRequisiteCourses.filter(
        el => el.courseId && el.isDeleted
      );

      const newPrerequisite = preRequisiteCourses.filter(
        el => el.courseId && !el.isDeleted
      );
      // console.log(deletePrerequisite);

      for (let i = 0; i < deletePrerequisite.length; i++) {
        await transactionClient.courseToPrerequisite.deleteMany({
          where: {
            AND: [
              {
                courseId: id,
              },
              {
                prerequisiteId: deletePrerequisite[i].courseId,
              },
            ],
          },
        });
      }

      for (let index = 0; index < newPrerequisite.length; index++) {
        await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: id,
            prerequisiteId: newPrerequisite[index].courseId,
          },
        });
      }
    }
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      prerequisite: {
        include: {
          preRequisit: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};

export const CourseService = { insertToDB, getAll, updateOneInDB };
