import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignUpButton from "./components/sign-up-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });
  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center font-bold">
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <SignUpButton />
    </div>
  );
};

export default DashboardPage;
