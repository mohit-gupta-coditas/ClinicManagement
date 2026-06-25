import z from "zod";

export const ZUser = z.object({
    id: z.uuid(`'id' must be a valid uuid`),
    name: z.string(`'name' must be a valid string`).trim().min(1),
    email: z.email(`'email' must be in valid format`),
    address: z.string(`'address' must be a valid string`).trim().min(1),
    phoneNumber: z.string(`'phoneNumber' must be a valid string`).trim().min(10).max(10),
    password: z.string(`'address' must be a valid string`).trim().min(1),
    passwordVersion: z.coerce.number(`'passwordVersion' must be a valid number`).optional(),
    role: z.enum(['patient','clinician','front-desk co-ordinator', 'super-admin']),
    createdAt: z.date(`'createdAt' must be a valid date`).optional(),
    updatedAt: z.date(`'updatedAt' must be a valid date`).optional()
});

export const ZUserOptions = z.object({
    search: z.string(`'search' must not be empty`).trim().min(1).optional(),
    limit: z.coerce.number(`'limit' must be a valid number `).default(10),
    offset: z.coerce.number(`'offset' must be a valid number`).default(0),
    sortBy: z.string(`'sortBy' must be a valid column name`).default('name'),
    orderBy: z.enum(['ASC', 'DESC']).default('ASC')
});

export type UserOptions = z.infer<typeof ZUserOptions>;

export type User = z.infer<typeof ZUser>;