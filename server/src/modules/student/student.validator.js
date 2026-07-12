import { z } from 'zod';

export const createStudentSchema = z.object({
  user_id: z
    .number({
      required_error: 'User is required.',
    })
    .int()
    .positive(),

  institution_id: z
    .number({
      required_error: 'Institution is required.',
    })
    .int()
    .positive(),

  matric_number: z
    .string({
      required_error: 'Matric number is required.',
    })
    .trim()
    .min(1, 'Matric number is required.')
    .max(50),

  admission_number: z
    .string({
      required_error: 'Admission number is required.',
    })
    .trim()
    .min(1, 'Admission number is required.')
    .max(50),

  admission_session_id: z
    .number({
      required_error: 'Admission session is required.',
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
    .default('Active'),
});

export const updateStudentSchema = createStudentSchema.partial();
