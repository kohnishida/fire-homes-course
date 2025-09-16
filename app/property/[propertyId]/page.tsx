import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPropertyById } from "@/data/properties";
import { ArrowLeftIcon, BathIcon, BedIcon } from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import ReactMarkDown from "react-markdown";
import BackButton from "./back-button";

export default async function Property({ params }: { params: Promise<any> }) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((addressLine) => !!addressLine);

  return (
    <div className="grid grid-cols-[1fr_500px]">
      <div>
        {!!property.images && (
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem
                  key={image}
                  className="relative h-[80vh] min-h-80"
                >
                  <Image
                    src={`https://firebasestorage.googleapis.com/v0/b/fire-homes-course-bc4bc.firebasestorage.app/o/${encodeURIComponent(
                      image
                    )}?alt=media`}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover"
                  ></Image>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="translate-x-24 size-10" />
                <CarouselNext className="-translate-x-24 size-10" />
              </>
            )}
          </Carousel>
        )}
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <BackButton />
          <ReactMarkDown>{property.description}</ReactMarkDown>
        </div>
      </div>
      <div className="bg-sky-200 p-10 h-screen sticky top-0 grid place-items-center">
        <div className="flex flex-col gap-4 w-full">
          <PropertyStatusBadge
            status={property.status}
            className="mr-auto text-base"
          />
          <h1 className="text-4xl font-semibold">
            {addressLines.map((addlessLine, index) => (
              <div key={index}>
                {addlessLine}
                {index < addressLines.length - 1 && ","}
              </div>
            ))}
          </h1>
          <h2 className="text-3xl font-light">
            £{numeral(property.price).format("0,0")}
          </h2>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <BedIcon /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex gap-2">
              <BathIcon /> {property.bathrooms} Bathrooms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
