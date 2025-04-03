import { z } from "zod";

export const DistrictSchema = z.object({
    id: z.string(),
    name: z.string(),
    coordinates: z.array(z.number()),
    population: z.number(),
    area: z.number(),
    description: z.string(),
    history: z.string(),
    attractions: z.array(z.string()),
    funFacts: z.array(z.string()),
});
