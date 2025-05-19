import * as z from 'zod';

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .regex(/^[a-z0-9][a-z0-9]*[a-z0-9]$/, {
      message:
        'Username can only contain lowercase letters, numbers ang hyphens. It must start with and end with a letter or number',
    })
    .refine((value) => !value.includes('--'), {
      message: 'Username connot contain consecutive hyphens',
    })
    .transform((value) => value.toLowerCase()),
  email: z.string().email(),
  password: z.string().min(6).trim(),
});

export type SignUpSchema = z.infer<typeof signupSchema>;
