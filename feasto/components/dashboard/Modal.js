
export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50  bg-opacity-40 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-700"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

