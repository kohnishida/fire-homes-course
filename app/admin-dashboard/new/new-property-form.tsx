"use client";
import PropertyForm from "@/components/property-form";
import { propertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";

export default function NewPropertyForm() {
  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    console.log("Submitted data:", {data});
  }

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