import { z } from 'zod';

export const createUrlSchema = z.object({
    title: z.string().nonempty("Title is required"),
    favicon: z.string().url("Invalid URL"),
    url: z.string().url("Invalid URL"),
    category: z.string().nonempty("Category is required"),
});
