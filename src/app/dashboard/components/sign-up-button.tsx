"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignUpButton = () => {
  const router = useRouter();
  return (
    <Button
      className="mt-4 bg-red-500 text-white hover:bg-red-600"
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/authentication");
            },
          },
        })
      }
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </Button>
  );
};

export default SignUpButton;
