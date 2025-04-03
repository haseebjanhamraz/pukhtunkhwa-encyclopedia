import z from "zod";

export const PoetrySchema = z.object({
    verse: z.array(z.string()),
    poet: z.string(),
    type: z.enum(['shair', 'ghazal', 'rubai', 'tappa', 'nazam', 'other']),
});
