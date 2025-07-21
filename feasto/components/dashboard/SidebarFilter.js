export default function SidebarFilter({ current, setFilter }) {
  const types = ["all", "delivery", "dine-in", "reservations"];

  return (
    <aside className="w-64 bg-black text-white p-6 space-y-4">
      {/* <h2 className="text-xl font-bold text-orange-500">Filter Orders</h2> */}
      {types.map((type) => (
        <button
          key={type}
          className={`block w-full text-left px-4 py-2 rounded ${
            current === type ? "bg-orange-500" : "hover:bg-gray-800"
          }`}
          onClick={() => setFilter(type)}
        >
          {type === "all"
            ? "All Orders"
            : type === "reservations"
            ? "Show Reservations"
            : type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </aside>
  );
}
