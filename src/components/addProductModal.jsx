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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-white">Add New Product</h2>
            <p className="text-sm text-slate-400">Inventory management and stock control</p>
          </div>
          <button onClick={onClose}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <X size={20}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-6">
            {/* Product Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Product
                Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full rounded-lg bg-slate-800 border-2 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                  errors.name ? 'border-red-500/50' : 'border-slate-700'
                }`}
                placeholder="Nike Revolution 6"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400 font-medium">{errors.name}</p>}
            </div>

            {/* Brand and Category Row */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800 border-2 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                    errors.brand ? 'border-red-500/50' : 'border-slate-700'
                  }`}
                  placeholder="NIKE"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800 border-2 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                    errors.category ? 'border-red-500/50' : 'border-slate-700'
                  }`}
                  placeholder="sport shoes"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`w-full rounded-lg bg-slate-800 border-2 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                  errors.description ? 'border-red-500/50' : 'border-slate-700'
                }`}
                placeholder="Details about the shoe material, fit, and technology..."
              />
            </div>

            {/* Price and Stock Row */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Price
                  (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800 border-2 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                    errors.price ? 'border-red-500/50' : 'border-slate-700'
                  }`}
                  placeholder="3995"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Stock
                  Units</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg bg-slate-800 border-2 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                    errors.stock ? 'border-red-500/50' : 'border-slate-700'
                  }`}
                  placeholder="90"
                />
              </div>
            </div>

            {/* Upload Section */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Product Images
                (Min 2)</label>
              <div
                className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/30 p-4 transition-colors hover:border-slate-500">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 py-4">
                  <div className="rounded-full bg-slate-800 p-3 text-indigo-400">
                    <Upload size={24}/>
                  </div>
                  <span className="text-sm font-medium text-slate-300">Click to upload media</span>
                  <span className="text-xs text-slate-500">PNG, JPG up to 5MB</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden"/>
                </label>

                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index}
                           className="group relative aspect-square rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
                        <img src={preview} alt="Preview" className="h-full w-full object-cover"/>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 rounded-full bg-red-500/80 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X size={12}/>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.images && <p className="mt-2 text-xs text-red-400 font-medium">{errors.images}</p>}
            </div>

            {/* Details Row */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Sizes</label>
                <input type="text" name="sizes" value={formData.sizes} onChange={handleInputChange}
                       className="w-full rounded-lg bg-slate-800 border-2 border-slate-700 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"/>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Colors</label>
                <input type="text" name="colors" value={formData.colors} onChange={handleInputChange}
                       className="w-full rounded-lg bg-slate-800 border-2 border-slate-700 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"/>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-10 flex items-center justify-end gap-3 border-t border-slate-800 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-8 py-2.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}