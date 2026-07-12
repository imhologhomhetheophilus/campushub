import { z } from 'zod';

export const createStudentSchema = z.object({
  user_id: z
    .number({
      required_error: 'User ID is required.',
      invalid_type_error: 'User ID must be a number.',
    })
    .int()
    .positive(),

  institution_id: z
    .number({
      required_error: 'Institution ID is required.',
      invalid_type_error: 'Institution ID must be a number.',
    })
    .int()
    .positive(),

  matric_number: z
    .string()
    .trim()
    .min(3, 'Matric number is required.')
    .max(50, 'Matric number is too long.'),

  admission_number: z
    .string()
    .trim()
    .min(3, 'Admission number is required.')
    .max(50, 'Admission number is too long.'),

  admission_session_id: z
    .number({
      required_error: 'Admission session is required.',
      invalid_type_error: 'Admission session must be a number.',
    })
    .int()
    .positive(),

  student_status: z
    .enum([
      'Active',
      'Deferred',
      'Suspended',
      'Withdrawn',
      'Graduated',
      'Alumni',
      'Expelled',
    ])
    .optional()
    .default('Active'),
});

export const updateStudentSchema = createStudentSchema.partial();
