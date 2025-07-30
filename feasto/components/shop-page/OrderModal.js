"use client";

import { useState, useEffect } from "react";
import { createOrder } from "@/lib/firebase/orders";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/lib/stores/authStore"; 


const ORDER_TYPES = {
  DINE_IN: "dine-in",
  DELIVERY: "delivery",
};

const initialFormData = {
  tableNumber: "",
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function OrderModal({
  isOpen,
  onClose,
  total,
  cart,
  clearCart,
}) {
  const t = useTranslations();
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const user = useAuthStore((state) => state.user);

useEffect(() => {
  if (isOpen && user) {
    if (orderType === ORDER_TYPES.DELIVERY) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.displayName || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    } else if (orderType === ORDER_TYPES.DINE_IN) {
      setFormData((prev) => ({
        ...prev,
        tableNumber: prev.tableNumber || "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
      }));
    } else {
      setFormData(initialFormData);
    }
  } else if (!isOpen) {
    setFormData(initialFormData);
  }
}, [isOpen, user, orderType]);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isDineInValid = () => formData.tableNumber.trim() !== "";

  const isDeliveryValid = () =>
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.postalCode.trim();

  if (!isOpen || cart.length === 0) return null;

  const handleClose = () => {
    setStep(1);
    setOrderType(null);
    setFormData(initialFormData);
    onClose();
  };

  const isFormValid =
    orderType === ORDER_TYPES.DINE_IN ? isDineInValid() : isDeliveryValid();

  const handleConfirm = async () => {
  if (!orderType) {
    toast.error(t("orderModal.pleaseSelectOrderType"));
    return;
  }
  
  if (!user?.uid) {
    toast.error(t("orderModal.userNotLoggedIn"));
    return;
  }

  setLoading(true);
  try {
    const cleanedFormData =
      orderType === ORDER_TYPES.DINE_IN
        ? {
            tableNumber: formData.tableNumber,
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
          }
        : { ...formData, tableNumber: "" };

    const orderPayload = {
      type: orderType,
      formData: cleanedFormData,
      items: cart,
      total,
      status: "pending",
      userId: user.uid, // userId added here
    };

    const result = await createOrder(orderPayload);
    toast.success(t("orderModal.orderPlacedSuccess"));
    console.log(result);
    clearCart();
    handleClose();
  } catch (error) {
    toast.error(t("orderModal.orderPlaceError"));
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="order-modal-title"
    >
      <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-white/70 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center transition"
          aria-label={t("orderModal.closeModal")}
          type="button"
        >
          &times;
        </button>

        {step === 1 && (
          <div className="space-y-6 text-gray-800 dark:text-gray-100">
            <h3
              id="order-modal-title"
              className="text-xl font-semibold text-center"
            >
              {t("orderModal.completeYourOrder")}
            </h3>
            <p className="text-md font-medium text-center">
              {t("orderModal.chooseOrderType")}
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 bg-white/80 hover:bg-orange-500 hover:text-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium shadow-sm transition"
                onClick={() => {
                  setOrderType(ORDER_TYPES.DINE_IN);
                  setStep(2);
                }}
              >
                {t("orderModal.dineIn")}
              </button>
              <button
                type="button"
                className="flex-1 bg-white/80 hover:bg-orange-500 hover:text-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium shadow-sm transition"
                onClick={() => {
                  setOrderType(ORDER_TYPES.DELIVERY);
                  setStep(2);
                }}
              >
                {t("orderModal.delivery")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            {orderType === ORDER_TYPES.DINE_IN && (
              <div className="space-y-6">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    {t("orderModal.tableNumber")}
                  </span>
                  <input
                    autoComplete="off"
                    type="number"
                    name="tableNumber"
                    min="1"
                    max="9"
                    value={formData.tableNumber}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (
                        val === "" ||
                        (Number(val) >= 1 && Number(val) <= 9)
                      ) {
                        handleChange(e);
                      }
                    }}
                    className="mt-2 w-full border border-gray-300 rounded-md px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t("orderModal.tableNumberExample")}
                    autoFocus
                  />
                </label>
                <button
                  type="button"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setStep(3)}
                  disabled={!isDineInValid()}
                  aria-disabled={!isDineInValid()}
                >
                  {t("orderModal.continue")}
                </button>
              </div>
            )}

            {orderType === ORDER_TYPES.DELIVERY && (
              <div className="space-y-4">
                {["fullName", "email", "phone", "address"].map((field) => (
                  <input
                    key={field}
                    autoComplete="off"
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t(`orderModal.${field}`)}
                    autoFocus={field === "fullName"}
                  />
                ))}
                <div className="flex gap-4">
                  <input
                    autoComplete="off"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 rounded-md px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t("orderModal.city")}
                  />
                  <input
                    autoComplete="off"
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 rounded-md px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={t("orderModal.postalCode")}
                  />
                </div>
                <button
                  type="button"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setStep(3)}
                  disabled={!isDeliveryValid()}
                  aria-disabled={!isDeliveryValid()}
                >
                  {t("orderModal.continue")}
                </button>
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <div className="space-y-6 text-gray-800 dark:text-gray-100">
            <h2 className="text-2xl font-semibold text-center">
              {t("orderModal.reviewYourOrder")}
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                {t("orderModal.orderType")}:{" "}
                <strong className="capitalize">
                  {orderType.replace("-", " ")}
                </strong>
              </p>
              {orderType === ORDER_TYPES.DINE_IN ? (
                <p>
                  {t("orderModal.tableNumber")}: {formData.tableNumber}
                </p>
              ) : (
                <>
                  <p>
                    {t("orderModal.fullName")}: {formData.fullName}
                  </p>
                  <p>
                    {t("orderModal.email")}: {formData.email}
                  </p>
                  <p>
                    {t("orderModal.phone")}: {formData.phone}
                  </p>
                  <p>
                    {t("orderModal.address")}: {formData.address},{" "}
                    {formData.city}, {formData.postalCode}
                  </p>
                </>
              )}
              <p>
                {t("orderModal.total")}: ${total.toFixed(2)}
              </p>
            </div>
            <button
              type="button"
              disabled={loading || !isFormValid || cart.length === 0}
              onClick={handleConfirm}
              className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold w-full transition ${
                loading || !isFormValid || cart.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              aria-disabled={loading || !isFormValid || cart.length === 0}
            >
              {loading
                ? t("orderModal.processing")
                : t("orderModal.confirmOrder")}
            </button>
            <button
              type="button"
              className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline text-center w-full"
              onClick={() => setStep(1)}
            >
              {t("orderModal.editOrderDetails")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
