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

const cropSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  growth_cycles: z.number(),
  kcal_per_harvest: z.number(),
  kcal_per_cycle: z.number(),
  temperature: z.object({
    min: unitValue,
    max: unitValue,
  }),
  irrigation: z.object({
    liquid: z.string().nullable(),
    liquid_amount: unitValue.nullable(),
    solid: z.string().nullable(),
    solid_amount: unitValue.nullable(),
  }),
  fertilizer: z.string().nullable(),
  light_required: z.number().nullable(),
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
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

const generatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  watts: z.number(),
  fuel_type: z.string(),
  consumption: unitValue,
  heat_output: unitValue,
  byproducts: z.array(z.object({
    product: z.string(),
    rate: unitValue,
    temp: unitValue.optional(),
  })).optional(),
  dimensions: z.string(),
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
});

const batterySchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  capacity: unitValue,
  leak_rate: unitValue,
  heat_output: unitValue,
  dimensions: z.string(),
  notes: z.string().optional(),
});

const geyserSchema = z.object({
  id: z.string(),
  name: z.string(),
  dlc: z.array(z.string()),
  output_material: z.string(),
  avg_output: unitValue,
  output_temp: unitValue,
  biome: z.string(),
  taming_complexity: z.enum(['low', 'medium', 'high']),
  taming_method: z.string(),
  power_output: unitValue.optional(),
  notes: z.string().optional(),
  image_slot: z.boolean().default(true),
});

const rooms = defineCollection({
  loader: file('src/data/rooms.yaml'),
  schema: roomSchema,
});

const crops = defineCollection({
  loader: file('src/data/crops.yaml'),
  schema: cropSchema,
});

const generators = defineCollection({
  loader: file('src/data/generators.yaml'),
  schema: generatorSchema,
});

const batteries = defineCollection({
  loader: file('src/data/batteries.yaml'),
  schema: batterySchema,
});

const geysers = defineCollection({
  loader: file('src/data/geysers.yaml'),
  schema: geyserSchema,
});

export const collections = {
  hatches,
  dreckos,
  pacus,
  pips,
  slicksters,
  shineBugs,
  rooms,
  crops,
  generators,
  batteries,
  geysers,
};
