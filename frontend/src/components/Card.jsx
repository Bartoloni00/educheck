export const Card = ({ number, label }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
      <div className="text-3xl font-bold text-gray-900">{number}</div>
      <p className="mt-2 text-gray-700">{label}</p>
    </div>
  );
};
