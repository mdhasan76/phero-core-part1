import { z } from 'zod';

const academicSemesterValidationSchema = z.object({
  body: z.object({
    year: z.number(),
    title: z.string(),
    code: z.string(),
    startMonth: z.string(),
    endMonth: z.string(),
  }),
});

export const AcademicSemsterValidaton = { academicSemesterValidationSchema };
