'use client'
import { useState } from "react";

export default function OrderModal({ isOpen, onClose, cart }) {
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState(null);
  const [formData, setFormData] = useState({
    tableNumber: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    console.log({ orderType, formData, cart });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-8 space-y-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition"
          aria-label="Close modal"
        >
          &#x2715;
        </button>

        {/* Step 1: Choose Order Type */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Order Now</h2>
            <p className="text-lg font-medium">Choose Order Type:</p>
            <div className="flex gap-6">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md font-semibold transition"
                onClick={() => {
                  setOrderType("dine-in");
                  setStep(2);
                }}
              >
                Dine In
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-md font-semibold transition"
                onClick={() => {
                  setOrderType("delivery");
                  setStep(2);
                }}
              >
                Delivery
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Dine-in Form */}
        {step === 2 && orderType === "dine-in" && (
          <div className="space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Table Number</span>
              <input
                type="text"
                name="tableNumber"
                value={formData.tableNumber}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="e.g. 5"
              />
            </label>
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-semibold w-full transition"
              onClick={() => setStep(3)}
              disabled={!formData.tableNumber.trim()}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Delivery Form */}
        {step === 2 && orderType === "delivery" && (
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="Phone Number"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="Street Address"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="City"
              />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="Postal Code"
              />
            </div>
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-semibold w-full transition"
              onClick={() => setStep(3)}
              disabled={
                !formData.fullName.trim() ||
                !formData.email.trim() ||
                !formData.phone.trim() ||
                !formData.address.trim() ||
                !formData.city.trim() ||
                !formData.postalCode.trim()
              }
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Review & Confirm</h2>
            <div className="text-gray-700 space-y-2 text-sm">
              <p>Order Type: <strong className="capitalize">{orderType.replace("-", " ")}</strong></p>
              {orderType === "dine-in" ? (
                <p>Table Number: {formData.tableNumber}</p>
              ) : (
                <>
                  <p>Name: {formData.fullName}</p>
                  <p>Email: {formData.email}</p>
                  <p>Phone: {formData.phone}</p>
                  <p>Address: {formData.address}, {formData.city}, {formData.postalCode}</p>
                </>
              )}
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold w-full transition"
              onClick={handleConfirm}
            >
              Confirm Order
            </button>
            <button
              className="mt-2 text-gray-500 hover:text-gray-700 underline text-sm"
              onClick={() => setStep(1)}
            >
              Edit Order Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
