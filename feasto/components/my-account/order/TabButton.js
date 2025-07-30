export default function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 font-semibold -mb-px border-b-4 transition
        ${
          active
            ? "border-orange-500 text-orange-600"
            : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        }`}
    >
      {children}
    </button>
  );
}
