
import ReservationsClient from "@/components/my-account/my-reservations/ReservationsContainer";
import AccountBanner from "@/components/my-account/common/AccountBanner";

export default function ReservationsPage() {

  return (
    <div className="bg-[rgba(221,89,3,0.05)] min-h-screen">
        <AccountBanner title="Reservations"/>
      <ReservationsClient />
    </div>
  );
}
