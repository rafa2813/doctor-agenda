import { z } from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1, { message: "Nome é obrigadtório." }),
    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória." }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório." }),
    availableFromWeekDay: z.number().min(0).max(6, {
      message: "Dia inicial da semana de disponibilidade é obrigatório.",
    }),
    availableToWeekDay: z.number().min(0).max(6, {
      message: "Dia final da semana de disponibilidade é obrigatório.",
    }),
    availableFromTime: z
      .string()
      .trim()
      .min(1, { message: "Hora de início de disponibilidade é obrigatória." }),
    availableToTime: z
      .string()
      .trim()
      .min(1, { message: "Hora de término de disponibilidade é obrigatória." }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "A hora de início deve ser anterior à hora de término.",
      path: ["availableToTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
