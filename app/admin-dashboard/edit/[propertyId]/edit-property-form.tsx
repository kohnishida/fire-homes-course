"use client";

import PropertyForm from "@/components/property-form";
import { auth, storage } from "@/firebase/client";
import { Property } from "@/types/property";
import { propertyDataSchema, propertySchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateProperty } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteObject, ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { savePropertyImages } from "../../actions";

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
  images = [], // Default to an empty array if no images are provided
}: Props) {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const { images: newImages, ...rest } = data;

    const response = await updateProperty({ ...rest, id }, token);

    if (!!response?.error) {
      toast.error("Error:", {
        description: response.message,
      });
      return;
    }

    const storageTasks: (UploadTask | Promise<void>)[] = [];
    const imagesToDelete = images.filter(image => !newImages.find(img => img.url === image));

    imagesToDelete.forEach(image => {
      storageTasks.push(deleteObject(ref(storage, image)));
    });

    const paths: string[] = [];
    newImages.forEach((image, index) => {
      if(image.file){
        const path = `properites/${id}/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);

        // create a reference to the storage location
        const storageRef = ref(storage, path);
        // create an upload task to upload the image
        storageTasks.push(uploadBytesResumable(storageRef, image.file));
      } else {
        paths.push(image.url);
      }
    });

    await Promise.all(storageTasks);
    await savePropertyImages({
      propertyId: id,
      images: paths,
    }, token);

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
          images: images.map(image => ({
            id: image,
            url: image,
          })),
        }}
      />
    </div>
  );
}
