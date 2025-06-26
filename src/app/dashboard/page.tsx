import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignUpButton from "./components/sign-up-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
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
