import { Course } from '@prisma/client';
import prisma from '../../../shared/prisma';

// insert new data
const insertToDB = async (data: Course): Promise<Course> => {
  // console.log()
  const result = await prisma.course.create({ data });
  return result;
};

export const CourseService = { insertToDB };
