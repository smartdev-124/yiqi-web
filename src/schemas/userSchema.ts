import { z } from 'zod'

// inputs and output must always be zod based so that we can export
// Todo: Update this shema , delete userSchema
//  role: 'USER' | 'ADMIN' | 'ANDINO_ADMIN' | 'NEW_USER';
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.date().nullable().optional(),
  picture: z.string().nullable(),
  phoneNumber: z.string().nullable().optional()
})

export const userDataCollectedShema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  shortDescription: z.string().optional(),
  linkedin: z
    .string()
    .url('Invalid URL for LinkedIn')
    .optional()
    .or(z.literal('')),
  x: z.string().url('Invalid URL for X').optional().or(z.literal('')),
  instagram: z
    .string()
    .url('Invalid URL for Instagram')
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('Invalid URL for Website')
    .optional()
    .or(z.literal(''))
})

export type UserType = z.infer<typeof userSchema>
export const baseProfileSchema = userDataCollectedShema.extend({
  name: z.string().min(4, 'Name must be at least 4 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional() /* !TODO: VALIDATION PHONENUMBER*/,
  stopCommunication: z.boolean().default(false)
})
export const profileFormSchema = baseProfileSchema.extend({
  picture: z.any()
})
export const profileDataSchema = baseProfileSchema.extend({
  picture: z.string(),
  id: z.string()
})
export type UserDataCollected = z.infer<typeof userDataCollectedShema>
export type ProfileDataValues = z.infer<typeof profileDataSchema>
export type ProfileFormValues = z.infer<typeof profileFormSchema>
