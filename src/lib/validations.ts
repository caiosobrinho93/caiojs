import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  subject: z.string().optional(),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "Mensagem muito longa"),
  // Honeypot field for spam protection
  website: z.string().max(0, "").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const testimonialFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  city: z.string().max(100, "Cidade muito longa").optional(),
  comment: z
    .string()
    .min(10, "Comentário deve ter pelo menos 10 caracteres")
    .max(500, "Comentário muito longo"),
  rating: z.number().int().min(1).max(5),
  // Honeypot
  website: z.string().max(0, "").optional(),
});

export type TestimonialFormData = z.infer<typeof testimonialFormSchema>;

export const projectFormSchema = z.object({
  title: z.string().min(2, "Título obrigatório").max(200),
  slug: z.string().min(2, "Slug obrigatório").max(200),
  short_description: z.string().max(300).optional(),
  full_description: z.string().optional(),
  category_id: z.string().uuid().optional().nullable(),
  tags: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  results: z.string().optional(),
  learnings: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_highlighted: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  project_date: z.string().optional().nullable(),
  external_url: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Nome obrigatório").max(100),
  slug: z.string().min(2, "Slug obrigatório").max(100),
  description: z.string().max(500).optional(),
  icon: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  badge: z.string().max(50).optional(),
  order: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;
