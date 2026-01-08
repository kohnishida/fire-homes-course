"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await auth?.loginWithGoogle();
          router.refresh();
        } catch (error) {
          console.error("Failed to login with Google", error);
          alert("Failed to login with Google. Please try again.");
        }
      }}
      className="w-full cursor-pointer"
    >
      Continue with Google
    </Button>
  );
}
