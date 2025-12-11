import { getUserFavourites } from "@/data/favourites";
import { getPropertiesByIds } from "@/data/properties";

export default async function MyFavourites({
  searchParams,
}: {
  searchParams?: Promise<any>;
}) {
  const searchParamsValues = await searchParams;
  const page = searchParamsValues?.page ? parseInt(searchParamsValues.page) : 1;
  const pageSize = 2;
  const favaourites = await getUserFavourites();
  const allFavourites = Object.keys(favaourites);
  const totalPages = Math.ceil(allFavourites.length / pageSize);

  const paginatedFavourites = allFavourites.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const properties = await getPropertiesByIds(paginatedFavourites);
  console.log({paginatedFavourites, properties});


  return <div>My Favourite Page</div>;
}
