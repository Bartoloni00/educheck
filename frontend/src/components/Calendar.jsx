import React from "react";
import { motion } from "framer-motion";

export const CalendarWeekView = ({ initialDate = "2025-01-01", events = [] }) => {
  const [currentDate, setCurrentDate] = React.useState(initialDate);

  const getLocalTodayISO = () => {
    const t = new Date();
    const y = t.getFullYear();
    const m = t.getMonth();
    const d = t.getDate();
    return new Date(y, m, d).toISOString().split("T")[0];
  };

  const goToToday = () => {
    const todayISO = getLocalTodayISO();
    const today = new Date(todayISO);
    if (today.getFullYear() === 2025) setCurrentDate(todayISO);
  };

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    const label = date.toLocaleDateString("es-AR", { weekday: "short" });
    const number = date.getDate();
    return { label, number, full: date.toISOString().split("T")[0] };
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getPosition = (time) => {
    const [hStr, mStr] = time.split(":");
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr || "0", 10);
    return h * 60 + m; // px
  };

  const [y, m, d] = currentDate.split("-").map(Number);
  let startDateObj = new Date(y, m - 1, d);
  const monthLabel = startDateObj.toLocaleString("es-AR", { month: "long" }).toUpperCase();
  const yearLabel = startDateObj.getFullYear();
  const todayISO = getLocalTodayISO();

  return (
    <div className="w-full max-h-[500px] overflow-auto bg-white border border-gray-200 text-gray-900 p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() - 7);
              if (d.getFullYear() === 2025) setCurrentDate(d.toISOString().split("T")[0]);
            }}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >Prev</button>

          <button
            onClick={goToToday}
            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200"
          >Hoy</button>

          <button
            onClick={() => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() + 7);
              if (d.getFullYear() === 2025) setCurrentDate(d.toISOString().split("T")[0]);
            }}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >Next</button>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-700">{monthLabel} - {yearLabel}</div>
        </div>

        <div className="w-24" />
      </div>

      {/* Days header */}
      <div className="grid grid-cols-8 border-t border-l border-gray-200 text-center text-sm">
        <div className="border-r border-gray-200"></div>
        {days.map((d) => (
          <div
            key={d.full}
            className="py-3 border-r border-gray-200 flex flex-col items-center"
          >
            <span className="text-xs text-gray-500">{d.label}</span>
            <span className={`
              font-bold px-2 py-1 rounded-full transition-all duration-200
              ${d.full === todayISO ? "bg-indigo-600 text-white shadow-lg" : "text-indigo-700 bg-transparent"}
            `}>
              {d.number}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="relative grid grid-cols-8 border-l border-t border-gray-200">
        {/* Hours column */}
        <div className="border-r border-gray-200 relative">
          {hours.map((h) => (
            <div
              key={h}
              className="h-16 border-b border-gray-200 text-xs text-gray-500 px-2 flex items-start"
            >
              {h.toString().padStart(2, "0") + ":00"}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {days.map((d) => (
          <div key={d.full} className="border-r border-gray-200 relative">
            {hours.map((h) => (
              <div key={h} className="h-16 border-b border-gray-200" />
            ))}

            {/* Events */}
            {events
              .filter((e) => e.date === d.full)
              .map((e, idx) => {
                const top = getPosition(e.start);
                const bottom = getPosition(e.end);
                const height = bottom - top;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute left-1 right-1 p-2 rounded-lg text-xs ${e.color} shadow-md`}
                    style={{ top, height }}
                  >
                    <div className="font-bold text-gray-900">{e.start}</div>
                    <div className="text-gray-700">{e.title}</div>
                  </motion.div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};
