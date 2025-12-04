import { AlertCircle, CheckCircle, MailIcon } from "lucide-react";

const ICONS = {
  sistema: <AlertCircle size={22} />,
  green: <CheckCircle size={22} />,
  yellow: <AlertCircle size={22} />,
  blue: <MailIcon size={22} />,
};

const COLORS = {
  sistema: "text-red-600",
  green: "text-green-600",
  yellow: "text-yellow-600",
  blue: "text-blue-600",
};

export const NotificationCard = ({ title, message, date, color }) => {
  const normalized = color?.toLowerCase();

  return (
    <div className="flex flex-row border p-4 rounded-lg max-w-[600px] bg-white shadow-md">
      <div className={`flex flex-col justify-center ${COLORS[normalized]}`}>
        {ICONS[normalized]}
      </div>

      <div className="flex flex-col p-4">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-lg text-gray-700">{message}</p>
        <time className="text-gray-500">{date}</time>
      </div>
    </div>
  );
};

