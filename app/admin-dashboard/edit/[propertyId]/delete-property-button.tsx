"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/context/actions";
import { useAuth } from "@/context/auth";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase/client";
import { deleteProperty } from "./actions";
import { useRouter } from "next/navigation";

export default function DeletePropertyButton({
  propertyId,
  images = [],
}: {
  propertyId: string;
  images: string[];
}) {
  const router = useRouter();
  const auth = useAuth();
  const [isDeleteing, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    setIsDeleting(true);

    const storageTasks: (Promise<void>)[] = [];
    
    images.forEach((image) => {
      storageTasks.push(deleteObject(ref(storage, image)));
    });

    await Promise.all(storageTasks);

    await deleteProperty(propertyId, token);
    setIsDeleting(false);
    router.push("/admin-dashboard");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" className="cursor-pointer">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this property?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              This action cannot be undone. This will permanently delete this propperty.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDeleteClick} disabled={isDeleteing}>
            {isDeleteing ? "Deleting..." : "Delete Property"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
