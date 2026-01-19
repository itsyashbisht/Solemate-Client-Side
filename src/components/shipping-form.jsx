import { useState } from "react";

export default function ShippingForm({ onSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "Yash Bisht",
    email: "yash2611@gmail.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    pincode: "110001",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
            1
          </div>
          <span className="text-sm font-medium text-black">Shipping</span>
        </div>
        <div className="h-px flex-1 mx-4 bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-semibold">
            2
          </div>
          <span className="text-sm font-medium text-gray-400">Payment</span>
        </div>
      </div>

      {/* Shipping Address Container */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-black">Shipping Address</h3>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-gray-600 hover:text-black transition"
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>

        {!isEditing ? (
          <div className="space-y-3 text-sm">
            <p className="font-medium text-black">{formData.fullname}</p>
            <p className="text-gray-600">{formData.email}</p>
            <p className="text-gray-600">{formData.phone}</p>
            <p className="text-gray-600">{formData.address}</p>
            <p className="text-gray-600">
              {formData.city}, {formData.state} {formData.pincode}
            </p>
          </div>
        ) : (
          /* Form without the internal button */
          <form
            id="shipping-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="floating-label">
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full pb-2 border-b border-gray-200 focus:border-black outline-none text-sm transition"
                />
                <label className="text-xs text-gray-500">Full Name</label>
              </div>
              <div className="floating-label">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full pb-2 border-b border-gray-200 focus:border-black outline-none text-sm transition"
                />
                <label className="text-xs text-gray-500">Email</label>
              </div>
            </div>
            <div className="floating-label">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                className="w-full pb-2 border-b border-gray-200 focus:border-black outline-none text-sm transition"
              />
              <label className="text-xs text-gray-500">Phone Number</label>
            </div>
            <div className="floating-label">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder=" "
                className="w-full pb-2 border-b border-gray-200 focus:border-black outline-none text-sm transition"
              />
              <label className="text-xs text-gray-500">Address</label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="floating-label">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full pb-2 border-b border-gray-200 focus:border-black outline-none text-sm transition"
                />
                <label className="text-xs text-gray-500">City</label>
              </div>
              <div className="floating-label">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full pb-2 border-b border-gray-200 focus:border-black outline-none text-sm transition"
                />
                <label className="text-xs text-gray-500">State</label>
              </div>
              <div className="floating-label">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full pb-2 border-b border-gray-200 focus:border-black outline-none text-sm transition"
                />
                <label className="text-xs text-gray-500">Pincode</label>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Button placed outside the border box */}
      <button
        type="submit"
        form="shipping-form"
        onClick={!isEditing ? handleSubmit : undefined}
        className="w-full bg-black text-white py-4 rounded-lg font-medium text-sm hover:bg-gray-900 transition shadow-lg shadow-black/5 active:scale-[0.99]"
      >
        Continue to Payment
      </button>
    </div>
  );
}
