"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import { ExtendedUser } from "@/types";

import { upsertPatientSchema } from "./schema";

export const upsertPatient = actionClient
  .schema(upsertPatientSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }
    const clinicId = (session.user as ExtendedUser).clinic?.id;
    if (!clinicId) {
      throw new Error("Clínica não encontrada");
    }

    const patient = {
      name: parsedInput.name,
      email: parsedInput.email,
      phoneNumber: parsedInput.phoneNumber,
      sex: parsedInput.sex,
      clinicId,
    };

    if (parsedInput.id) {
      await db
        .update(patientsTable)
        .set(patient)
        .where(eq(patientsTable.id, parsedInput.id));
    } else {
      await db.insert(patientsTable).values(patient);
    }

    revalidatePath("/patients");
  });
