import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import countryList from "react-select-country-list";
import { foodCategories } from "../utils/data";
import { DocumentCountType, RecipeListType } from "../types";
import { AxiosInstance } from "../libs/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component";
import { LuLoader2 } from "react-icons/lu";
import RecipeCard from "../components/recipe/RecipeCard";

const Recipes = () => {
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [resultCount, setResultCount] = useState(0);
  const [recipeList, setRecipeList] = useState<RecipeListType[] | []>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearch(e.target.value);
    });
  };

  useEffect(() => {
    (async () => {
      const { data: countData } = await AxiosInstance.get<DocumentCountType>(
        `/recipe/get-recipe-count?country=${country}&category=${category}&search=${search}`
      );

      const { data: dataList } = await AxiosInstance.get<RecipeListType[]>(
        `/recipe/get-recipes?country=${country}&category=${category}&search=${search}&limit=${20}&page=${0}`
      );
      setResultCount(countData.count);
      setRecipeList(dataList);
    })();
  }, [country, category, search]);

  const handleGetNextRecipes = async () => {
    const { data: dataList } = await AxiosInstance<RecipeListType[]>(
      `/recipes/get-recipes?country=${country}&category=${category}&search=${search}&limit=${20}&page=${page}`
    );
    setRecipeList((prev) => [...prev, ...dataList]);
    setPage((page) => page++);
  };

  return (
    <section>
      <h1 className="text-4xl font-bold mb-6">All recipes</h1>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Search by title:
          </label>
          <input
            // value={search}
            onChange={handleSetSearch}
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Filter by country:
            </label>
            <select
              //   value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select a country</option>
              {countryOptions.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Filter by category:
            </label>
            <select
              //   value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select a category</option>
              {foodCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="my-8">
        <InfiniteScroll
          dataLength={resultCount}
          next={handleGetNextRecipes}
          hasMore={recipeList.length < resultCount}
          loader={
            <div className="flex justify-center items-center">
              <LuLoader2 className="animate-spin w-10 h-10 text-orange-500" />
            </div>
          }
          style={{ overflow: "visible" }}
          endMessage={
            <div className="flex justify-center items-center">
              <p className="font-semibold text-sm text-orange-500 mt-8">
                No more recipe!
              </p>
            </div>
          }
        >
          <div className="space-y-8">
            {recipeList.length
              ? recipeList.map((recipe: RecipeListType) => (
                  <RecipeCard {...recipe} />
                ))
              : null}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Recipes;
