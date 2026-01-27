import { Upload, X } from "lucide-react";
import { useState } from "react";

export function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    sizes: "7,8,9,10",
    colors: "White,Black",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024; // 5MB per file

    const validFiles = [];
    const newErrors = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        newErrors.push(`${file.name} is not an image`);
      } else if (file.size > maxSize) {
        newErrors.push(`${file.name} exceeds 5MB limit`);
      } else {
        validFiles.push(file);
      }
    });

    if (newErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: newErrors.join(", "),
      }));
      return;
    }

    const combinedFiles = [...imageFiles, ...validFiles];
    if (combinedFiles.length > 7) {
      setErrors((prev) => ({
        ...prev,
        images: "Maximum 7 images allowed",
      }));
      return;
    }

    setImageFiles(combinedFiles);

    const previews = combinedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    if (errors.images) {
      setErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.stock || Number(formData.stock) < 0)
      newErrors.stock = "Valid stock quantity is required";
    if (imageFiles.length < 2)
      newErrors.images = "At least 2 product images are required";
    if (!formData.sizes.trim())
      newErrors.sizes = "At least one size is required";
    if (!formData.colors.trim())
      newErrors.colors = "At least one color is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // CREATE FORMDATA OBJ FOR FILE UPLOAD
    const uploadFormData = new FormData();

    // ADD TEXT FIELDS
    uploadFormData.append("name", formData.name);
    uploadFormData.append("brand", formData.brand);
    uploadFormData.append("category", formData.category);
    uploadFormData.append("description", formData.description);
    uploadFormData.append("price", formData.price);
    uploadFormData.append("stock", formData.stock);
    uploadFormData.append("sizes", formData.sizes);
    uploadFormData.append("colors", formData.colors);

    // ADD IMAGE FILES
    imageFiles.forEach((file) => {
      uploadFormData.append("images", file);
    });

    console.log("[v0] FormData created with fields:");
    console.log("[v0] - Name:", formData.name);
    console.log("[v0] - Brand:", formData.brand);
    console.log("[v0] - Category:", formData.category);
    console.log("[v0] - Images:", imageFiles.length);

    console.log("[v0] New product added:", uploadFormData);
    for (let pair of uploadFormData.entries()) {
      console.log(pair[0], pair[1]);
    }

    onAddProduct(uploadFormData);

    // Reset form
    setFormData({
      name: "",
      brand: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      sizes: "7,8,9,10",
      colors: "White,Black",
    });
    setImageFiles([]);
    setImagePreviews([]);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 text-gray-600 hover:text-black"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="font-sans text-2xl font-bold tracking-tight">
            Add New Product
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the details to add a new product
          </p>

          <div className="mt-6 grid gap-4">
            {/* Product Name */}
            <div>
              <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-2 w-full border-2 px-4 py-2 font-sans focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Nike Air Max 90"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Brand and Category */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={`mt-2 w-full border-2 px-4 py-2 font-sans focus:outline-none ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Nike, Adidas"
                />
                {errors.brand && (
                  <p className="mt-1 text-sm text-red-500">{errors.brand}</p>
                )}
              </div>

              <div>
                <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`mt-2 w-full border-2 px-4 py-2 font-sans focus:outline-none ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Running Shoes"
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`mt-2 w-full border-2 px-4 py-2 font-sans focus:outline-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your product..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className={`mt-2 w-full border-2 px-4 py-2 font-sans focus:outline-none ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="9999"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`mt-2 w-full border-2 px-4 py-2 font-sans focus:outline-none ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="100"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Product Images */}
            <div>
              <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                Product Images (Min 2, Max 5) *
              </label>
              <div className="mt-2 flex flex-col gap-3">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-6 transition-colors hover:border-black hover:bg-gray-50">
                  <Upload size={20} />
                  <span className="font-sans font-bold">
                    Click to upload images
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg border border-gray-200"
                      >
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-1 top-1 bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                        <div className="absolute bottom-1 left-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                          {index + 1} / {imagePreviews.length}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-600">
                  {imagePreviews.length > 0
                    ? `${imagePreviews.length} image(s) selected`
                    : "No images selected"}
                </p>
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-500">{errors.images}</p>
              )}
            </div>

            {/* Sizes */}
            <div>
              <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                Available Sizes (comma-separated) *
              </label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleInputChange}
                className={`mt-2 w-full border-2 px-4 py-2 font-sans focus:outline-none ${
                  errors.sizes ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="7, 8, 9, 10"
              />
              {errors.sizes && (
                <p className="mt-1 text-sm text-red-500">{errors.sizes}</p>
              )}
            </div>

            {/* Colors */}
            <div>
              <label className="block font-sans text-sm font-bold uppercase tracking-wide">
                Available Colors (comma-separated) *
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                className={`mt-2 w-full border-2 px-4 py-2 font-sans focus:outline-none ${
                  errors.colors ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="White, Black, Red"
              />
              {errors.colors && (
                <p className="mt-1 text-sm text-red-500">{errors.colors}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 py-3 font-sans font-bold uppercase tracking-wide text-black transition-all hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-black py-3 font-sans font-bold uppercase tracking-wide text-white transition-all hover:bg-gray-800"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
