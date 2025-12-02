export const Card = ({ number, label }) => {
  return (
    <div className="bg-[#202225] border border-gray-800 rounded-xl p-6 shadow-lg shadow-black/10">
      <div className="text-3xl font-bold text-white">{number}</div>
      <p className="mt-2 text-gray-400">{label}</p>
    </div>
  )
}
