import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

// insert new data
const insertToDB = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...coursesData } = data;
  // console.log(data);

  const newCourse = await prisma.$transaction(async clientTransaction => {
    const result = await clientTransaction.course.create({ data: coursesData });

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        const createPrerequisite =
          await clientTransaction.courseToPrerequisite.create({
            data: {
              courseId: result.id,
              prerequisiteId: preRequisiteCourses[index].courseId,
            },
          });
        console.log(createPrerequisite);
      }
    }
    return result;
  });
  console.log(newCourse, 'hey');
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

export const CourseService = { insertToDB };
