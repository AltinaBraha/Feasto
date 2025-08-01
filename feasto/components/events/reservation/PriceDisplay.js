"use client";

export default function PriceDisplay({ basePrice, discount }) {
  const hasDiscount = discount > 0;
  const finalPrice = basePrice * (1 - discount / 100);

  return (
    <div className="text-lg font-bold text-gray-800">
      Total Price:{" "}
      {hasDiscount ? (
        <>
          <span className="line-through text-red-500 mr-2">
            €{basePrice.toFixed(2)}
          </span>
          <span className="text-orange-600">€{finalPrice.toFixed(2)}</span>
        </>
      ) : (
        <span className="text-orange-600">€{basePrice.toFixed(2)}</span>
      )}
    </div>
  );
}
