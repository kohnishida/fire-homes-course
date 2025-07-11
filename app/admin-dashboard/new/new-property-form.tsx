"use client";
import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { createProperty } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();
  
    if (!token) {
      return;
    }
  
    const response = await createProperty(data, token);
    if (!!response.error) {
      toast.error("Error:", {
        description: response.error
      });
      return;
    }

    toast.success("Success!", {
      description: "Property created!",
    });

    router.push("/admin-dashboard");

    console.log({ response });
  };

  return (
    <>
      <PropertyForm
        handleSubmit={handleSubmit}
        subtmitButonLabel={
          <>
            <PlusCircleIcon /> Create Property
          </>
        }
      />
    </>
  );
}
