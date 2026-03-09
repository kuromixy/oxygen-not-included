import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const unitValue = z.object({
  value: z.number(),
  unit: z.string(),
});

const critterSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(),
  dlc: z.array(z.string()),
  diet: z.array(z.string()),
  output: z.object({
    product: z.string(),
    rate: unitValue,
    method: z.string().optional(),
  }),
  calories: z.object({
    metabolism: unitValue,
  }),
  stable_capacity: z.number(),
  space_per_critter: z.number().optional(),
  temperature: z.object({
    min: unitValue,
    max: unitValue,
  }),
  grooming: z.object({
    station: z.string(),
    cycle_time: unitValue,
  }),
  image_slot: z.boolean().default(true),
  notes: z.string().optional(),
});

const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  dimensions: z.object({
    min: z.number(),
    max: z.number(),
  }),
  required_buildings: z.array(z.string()),
  bonus: z.string(),
  upgrade_from: z.string().nullable(),
  upgrade_to: z.string().nullable(),
  layout_tip: z.string(),
  diagram_slot: z.boolean().default(true),
  dlc: z.array(z.string()),
});

const hatches = defineCollection({
  loader: file('src/data/hatches.yaml'),
  schema: critterSchema,
});

const dreckos = defineCollection({
  loader: file('src/data/dreckos.yaml'),
  schema: critterSchema,
});

const pacus = defineCollection({
  loader: file('src/data/pacus.yaml'),
  schema: critterSchema,
});

const pips = defineCollection({
  loader: file('src/data/pips.yaml'),
  schema: critterSchema,
});

const slicksters = defineCollection({
  loader: file('src/data/slicksters.yaml'),
  schema: critterSchema,
});

const shineBugs = defineCollection({
  loader: file('src/data/shine-bugs.yaml'),
  schema: critterSchema,
});

const rooms = defineCollection({
  loader: file('src/data/rooms.yaml'),
  schema: roomSchema,
});

export const collections = {
  hatches,
  dreckos,
  pacus,
  pips,
  slicksters,
  shineBugs,
  rooms,
};
