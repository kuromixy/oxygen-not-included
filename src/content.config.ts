import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const unitValue = z.object({
  value: z.number(),
  unit: z.string(),
});

const critters = defineCollection({
  loader: file('src/data/hatches.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    dlc: z.array(z.string()),
    diet: z.array(z.string()),
    output: z.object({
      product: z.string(),
      rate: unitValue,
    }),
    calories: z.object({
      metabolism: unitValue,
    }),
    stable_capacity: z.number(),
    temperature: z.object({
      min: unitValue,
      max: unitValue,
    }),
    grooming: z.object({
      station: z.string(),
      cycle_time: unitValue,
    }),
    notes: z.string().optional(),
  }),
});

export const collections = { critters };
