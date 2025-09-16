"use client";
import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { createProperty } from "./actions";
import { savePropertyImages } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, UploadTask, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/client";

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();
  
    if (!token) {
      return;
    }

    const {images, ...rest} = data;

    // create property in firestore
    const response = await createProperty(rest, token);

    if (!!response.error || !response.propertyId) {
      toast.error("Error:", {
        description: response.error
      });
      return;
    }

    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];
    images.forEach((image, index) => {
      if(image.file) {
        const path = `properites/${response.propertyId}/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);

        // create a reference to the storage location
        const storageRef = ref(storage, path);
        // create an upload task to upload the image
        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    // wait for all uploads to complete
    await Promise.all(uploadTasks);

    // save image paths to firestore
    await savePropertyImages({
      propertyId: response.propertyId,
      images: paths,
    }, token);
    

    toast.success("Success!", {
      description: "Property created!",
    });

    router.push("/admin-dashboard");
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
