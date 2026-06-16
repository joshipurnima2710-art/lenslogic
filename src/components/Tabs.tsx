
export default function Tabs() {
  return (
    <div className="flex gap-6 px-6 py-3 border-b bg-white">
      <button className="text-gray-500">All</button>
      <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
        Cameras
      </button>
      <button className="text-gray-500">Lenses</button>
    </div>
  );
}
