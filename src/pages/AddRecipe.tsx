import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import OptimizedImage from "../components/shared/OptimizedImage";
import { foodCategories } from "../utils/data";
import countryList from "react-select-country-list";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AxiosInstance } from "../libs/axiosInstance";

const AddRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");
  const [formData, setFormData] = useState({
    image: null,
    video: "",
    country: "",
    category: "",
    title: "",
  });

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.image) return toast.error("Food image is required");
      if (!formData.title) return toast.error("Title is required");
      if (!details) return toast.error("Food details is required");
      if (!formData.category) return toast.error("Food category is required");
      if (!formData.country) return toast.error("Food country is required");
      if (!formData.video) return toast.error("Food youtube code is required");
      // Process the form data
      const data = new FormData();
      data.append("image", formData.image);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGEBB_KEY
        }`,
        {
          method: "POST",
          body: data,
        }
      );
      const response = await res.json();

      await AxiosInstance.post("/recipe/create", {
        ...formData,
        image: response.data.display_url,
        details,
      });

      toast.success("Your recipe published successfully!");

      // clean form after successful submission
      setFormData({
        image: null,
        video: "",
        country: "",
        category: "",
        title: "",
      });
      setDetails("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-4xl font-bold">Add your secret recipe 🍒🍒</h1>

      {formData.image && (
        <div className="mb-4">
          <OptimizedImage
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="max-w-sm h-auto rounded mx-auto"
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Recipe Image:
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Recipe Details:
          </label>
          <ReactQuill
            // className="max-h-[40vh]"
            theme="snow"
            value={details}
            onChange={setDetails}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            YouTube Video Code:
          </label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country:
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
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
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <LuLoader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddRecipe;
