"use client";

import PropertyForm from "@/components/property-form";
import { auth } from "@/firebase/client";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateProperty } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = Property;

export default function EditPropertyForm({
  id,
  address1,
  address2,
  city,
  postcode,
  price,
  bedrooms,
  bathrooms,
  description,
  status,
}: Props) {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    await updateProperty({ ...data, id }, token);
    toast.success("Success!", {
      description: "Property updated!",
    });

    router.push('/admin-dashboard')
  };

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        subtmitButonLabel={
          <>
            <SaveIcon /> Save Property
          </>
        }
        defaultValues={{
          address1,
          address2,
          city,
          postcode,
          price,
          bedrooms,
          bathrooms,
          description,
          status,
        }}
      />
    </div>
  );
}
