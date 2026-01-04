import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    alt: z.string(),
    repository: z.string().url(),
    order: z.number(),
  }),
});

const skillsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    name: z.string(),
    icon: image(),
    level: z.number().min(0).max(100),
    order: z.number(),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'skills': skillsCollection,
};
