"use client";

import { HeartIcon } from "lucide-react";
import { addFavourite } from "./actions";
import { useAuth } from "@/context/auth";

export default function ToggleFavouriteButton({
  propertyId,
  isFavourite,
}: {
  propertyId: string;
  isFavourite: boolean;
}) {
  const auth = useAuth();
  return (
    <button
      className="absolute top-0 right-0 z-10 p-2 cursor-pointer"
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) {
          console.error("User is not authenticated");
          return;
        }
        await addFavourite(propertyId, tokenResult?.token);
      }}
    >
      <HeartIcon fill={isFavourite ? "pink" : "white"} />
    </button>
  );
}
