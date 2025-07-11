import {z} from "zod";

export const propertyDataSchema = z.object({
  address1: z.string().min(1, "Address line 1 must contain a value"),
  address2: z.string().optional(),
  city: z.string().min(3, "City must contain at least 3 characters"),
  postcode: z.string().refine((postcode) => /^\d{5}$/.test(postcode), {
    message: "Invalid German postcode",
  }),
  price: z.coerce.number().positive("Price must be greater than 0"),
  description: z.string().min(40, "Description must be at least 40 characters"),
  bedrooms: z.coerce.number().min(0, "Bedrooms must be at least 0"),
  bathrooms: z.coerce.number().min(0, "Bathrooms must be at least 0"),
  status:  z.enum(["draft", "for-sale", "sold", "withdrawn"])
});