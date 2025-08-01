"use client";

export default function RewardNotice({ pastReservationsCount }) {
  if (pastReservationsCount >= 2) return null;

  return (
    <p className="text-sm text-blue-600 mt-1">
      📢 Book {2 - pastReservationsCount} more event
      {2 - pastReservationsCount > 1 ? "s" : ""} to get a 15% discount!
    </p>
  );
}
