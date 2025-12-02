import React from "react";
import { motion } from "framer-motion";

export const CalendarWeekView = ({ initialDate = "2025-01-01", events = [] }) => {
  // Local internal state for navigation
  const [currentDate, setCurrentDate] = React.useState(initialDate);

  // compute local "today" in YYYY-MM-DD using local timezone (prevents off-by-one)
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

  // Generate 7 dynamic days from currentDate
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);

    const label = date.toLocaleDateString("en-US", { weekday: "short" });
    let number = date.getDate();
    number = number + 1; // FORCE +1();

    return { label, number, full: date.toISOString().split("T")[0] };
  });

  const hours = Array.from({ length: 24 }, (_, i) => i); // 00:00 to 23:00

  const getPosition = (time) => {
    // expects HH:MM 24h format
    const [hStr, mStr] = time.split(":");
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr || "0", 10);
    // position relative to 00:00, but visually we can start at top
    return h * 60 + m; // px units; you can scale if needed
  };
const [y, m, d] = currentDate.split("-").map(Number);
let startDateObj = new Date(y, m - 1, d);

let rawMonth = startDateObj.toLocaleString("es-AR", { month: "long" }).toUpperCase();
const monthLabel = rawMonth;
const yearLabel = startDateObj.getFullYear();

const todayISO = getLocalTodayISO();


  return (
    <div className="w-full max-h-[500px] overflow-auto bg-[#202225] border border-gray-800 text-white p-6 rounded-xl shadow-xl">
      {/* Header: prev - hoy - next  |  month year  (justify-between) */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() - 7);
              if (d.getFullYear() === 2025) setCurrentDate(d.toISOString().split("T")[0]);
            }}
            className="px-3 py-1 bg-slate-700 rounded-lg"
          >Prev</button>

          <button
            onClick={goToToday}
            className="px-3 py-1 bg-indigo-600 rounded-lg"
          >Hoy</button>

          <button
            onClick={() => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() + 7);
              if (d.getFullYear() === 2025) setCurrentDate(d.toISOString().split("T")[0]);
            }}
            className="px-3 py-1 bg-slate-700 rounded-lg"
          >Next</button>
        </div>

        <div className="text-center">
          <div className="text-sm text-slate-300">{monthLabel} - {yearLabel}</div>
        </div>

        <div className="w-24" />
      </div>

      <div className="grid grid-cols-8 border-t border-l border-slate-700 text-center text-sm">
        <div className="border-r border-slate-700"></div>
        {days.map((d) => (
          <div
            key={d.full}
            className="py-3 border-r border-slate-700 flex flex-col items-center"
          >
            <span className="text-xs text-slate-300">{d.label}</span>
            <span className={
              `font-bold px-2 py-1 rounded-full transition-all duration-200 ${
                d.full === todayISO
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-indigo-400 bg-transparent"
              }`
            }>
              {d.number}
            </span>
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-8 border-l border-t border-slate-800">
        {/* Hours column */}
        <div className="border-r border-slate-700 relative">
          {hours.map((h) => (
            <div
              key={h}
              className="h-16 border-b border-slate-800 text-xs text-slate-400 px-2 flex items-start"
            >
              {h.toString().padStart(2, "0") + ":00"}
            </div>
          ))}
        </div>

        {/* Days grid */}
        {days.map((d) => (
          <div
            key={d.full}
            className="border-r border-slate-800 relative"
          >
            {hours.map((h) => (
              <div key={h} className="h-16 border-b border-slate-800" />
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
                    className={`absolute left-1 right-1 p-2 rounded-lg text-xs ${e.color} backdrop-blur-md shadow-lg`}
                    style={{ top, height }}
                  >
                    <div className="font-bold text-slate-200">{e.start}</div>
                    <div className="text-slate-300">{e.title}</div>
                  </motion.div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
