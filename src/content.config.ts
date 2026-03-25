import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const devices = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/devices' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    equipment: z.array(z.string()),
    standards: z.array(z.string()).optional(),
    image: z.string().optional(),
    order: z.number().optional(),
  }),
});

const multipleChoiceStep = z.object({
  type: z.literal('multiple-choice'),
  id: z.string(),
  question: z.string(),
  hint: z.string().optional(),
  choices: z.array(
    z.object({
      text: z.string(),
      correct: z.boolean(),
      feedback: z.string(),
    })
  ),
});

const labHandoffStep = z.object({
  type: z.literal('lab-handoff'),
  id: z.string(),
  instruction: z.string(),
  simulated_data: z.object({
    tool: z.string(),
    load: z.string().optional(),
    readings: z.array(
      z.object({
        setting: z.string(),
        delivered: z.string().nullable(),
        status: z.enum(['pass', 'fail', 'warning']),
        error: z.string().optional(),
        charge_time: z.string().optional(),
        spec: z.string().optional(),
      })
    ),
  }),
});

const scenarios = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './src/content/scenarios' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    device: z.string(),
    category: z.string(),
    level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    estimated_time: z.string(),
    has_lab_handoff: z.boolean(),
    briefing: z.object({
      caller: z.string(),
      location: z.string(),
      facility: z.string(),
      time: z.string(),
      message: z.string(),
      urgency: z.enum(['low', 'medium', 'high']),
      context: z.array(z.string()),
    }),
    steps: z.array(z.discriminatedUnion('type', [multipleChoiceStep, labHandoffStep])),
    learning_points: z.array(
      z.object({
        text: z.string(),
        source: z.string().optional(),
        source_type: z
          .enum(['standard', 'incident-data', 'literature', 'best-practice'])
          .optional(),
      })
    ),
  }),
});

const labs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/labs' }),
  schema: z.object({
    title: z.string(),
    course: z.enum(['MTE200', 'MTE210']),
    description: z.string(),
    equipment: z.array(z.string()),
    prerequisites: z.array(z.string()).optional(),
    duration: z.string().optional(),
  }),
});

const reference = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reference' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

export const collections = { devices, scenarios, labs, reference };
