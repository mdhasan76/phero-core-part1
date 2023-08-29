import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

export const AcademicFacultyValidation = { academicFacultyValidationSchema };
