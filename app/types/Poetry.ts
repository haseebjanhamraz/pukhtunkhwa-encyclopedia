import { z } from "zod";

export const PoetrySchema = z.object({
    verse: z.array(z.string()).min(1, "Verse is required"),
    poet: z.string(),
    backgroundImg: z.string().min(1, "Background image is required"),
    type: z.string().min(1, "Type is required"),
    updatedAt: z.date(),
});

export type Poetry = z.infer<typeof PoetrySchema>;
