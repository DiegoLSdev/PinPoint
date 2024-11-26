import { z } from 'zod';

export const createRoutineSchema = z.object({
    dayOfWeek: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    routines: z.array(z.object({
        title: z.string({
            required_error: "Title is required",
        }),
        imageUrl: z.string().url().optional(),
        finished: z.boolean().default(false),
        reps: z.number({
            required_error: "Reps are required",
        }),
        series: z.number({
            required_error: "Series are required",
        }),
        weight: z.number().default(0), // Default to 0 if not provided
        muscularGroup: z.string({
            required_error: "Muscular group is required",
        }),
    })),
});

