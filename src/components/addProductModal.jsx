'use client';

import { Upload, X } from 'lucide-react'
import { useState } from 'react'

export function AddProductModal ({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    sizes: '7,8,9,10',
    colors: 'White,Black',
  })

  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    const maxSize = 5 * 1024 * 1024
    const validFiles = []
    const newErrors = []

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        newErrors.push(`${file.name} is not an image`)
      } else if (file.size > maxSize) {
        newErrors.push(`${file.name} exceeds 5MB limit`)
      } else {
        validFiles.push(file)
      }
    })

    if (newErrors.length > 0) {
      setErrors((prev) => ({ ...prev, images: newErrors.join(', ') }))
      return
    }

    const combinedFiles = [...imageFiles, ...validFiles]
    if (combinedFiles.length > 7) {
      setErrors((prev) => ({ ...prev, images: 'Maximum 7 images allowed' }))
      return
    }

    setImageFiles(combinedFiles)
    const previews = combinedFiles.map((file) => URL.createObjectURL(file))
    setImagePreviews(previews)
    if (errors.images) setErrors((prev) => ({ ...prev, images: '' }))
  }

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required'
    if (!formData.category.trim()) newErrors.category = 'Category is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required'
    if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'Valid stock is required'
    if (imageFiles.length < 2) newErrors.images = 'Min 2 images required'
    if (!formData.sizes.trim()) newErrors.sizes = 'Sizes required'
    if (!formData.colors.trim()) newErrors.colors = 'Colors required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const uploadFormData = new FormData()
    Object.keys(formData).forEach(key => uploadFormData.append(key, formData[key]))
    imageFiles.forEach((file) => uploadFormData.append('images', file))

    onAddProduct(uploadFormData)

    // Reset
    setFormData({
      name: '', brand: '', category: '', description: '',
      price: '', stock: '', sizes: '7,8,9,10', colors: 'White,Black',
    })
    setImageFiles([])
    setImagePreviews([])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
      <div className="relative max-h-[90vh] sm:max-h-[95vh] w-full max-w-sm sm:max-w-lg overflow-y-auto rounded-t-2xl sm:rounded-xl bg-slate-900 border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start sm:items-center justify-between border-b border-slate-700/50 bg-slate-900 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-white">Add Product</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Add new item to inventory</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 sm:p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors flex-shrink-0 ml-2"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500/50' : 'border-slate-700/50'
                }`}
                placeholder="Nike Revolution 6"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Brand and Category Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.brand ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="NIKE"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.category ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="Shoes"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                  errors.description ? 'border-red-500/50' : 'border-slate-700/50'
                }`}
                placeholder="Product details..."
              />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
            </div>

            {/* Price and Stock Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.price ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="3995"
                />
                {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800/50 border-2 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all ${
                    errors.stock ? 'border-red-500/50' : 'border-slate-700/50'
                  }`}
                  placeholder="90"
                />
                {errors.stock && <p className="mt-1 text-xs text-red-400">{errors.stock}</p>}
              </div>
            </div>

            {/* Upload Section */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Images (Min 2)</label>
              <div className="rounded-lg border-2 border-dashed border-slate-700/50 bg-slate-800/20 p-3 transition-colors hover:border-slate-600">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 py-3">
                  <div className="rounded-full bg-slate-800/60 p-2 text-blue-400">
                    <Upload size={20} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">Click to upload</span>
                  <span className="text-xs text-slate-500">PNG, JPG up to 5MB</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>

                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square rounded-lg border border-slate-700/50 bg-slate-900/50 overflow-hidden"
                      >
                        <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0.5 right-0.5 rounded-full bg-red-500/80 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.images && <p className="mt-1.5 text-xs text-red-400">{errors.images}</p>}
            </div>

            {/* Details Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Sizes</label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-slate-800/50 border-2 border-slate-700/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">Colors</label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-slate-800/50 border-2 border-slate-700/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 sm:mt-8 flex items-center justify-end gap-2 sm:gap-3 border-t border-slate-700/50 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-4 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white shadow-lg hover:shadow-blue-600/50 transition-all active:scale-95"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
