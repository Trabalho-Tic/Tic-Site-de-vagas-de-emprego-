export default function ActivityCard({ company, title, location, time }) {
  return (
    <div className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition">
      <div className="flex justify-between items-center mb-2">
        <p className="font-medium text-gray-700">{company}</p>
      </div>
      <p className="text-gray-900 font-semibold">{title}</p>
      <p className="text-gray-500 text-sm">{location}</p>
      <p className="text-green-600 text-xs mt-2">{time}</p>
    </div>
  );
}
