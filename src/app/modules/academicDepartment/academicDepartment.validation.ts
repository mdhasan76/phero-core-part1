import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

export const AcademicDepartmentValidation = {
  academicDepartmentValidationSchema,
};
