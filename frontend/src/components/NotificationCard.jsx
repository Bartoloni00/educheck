import { AlertCircle, CheckCircle, MailIcon } from "lucide-react";

const COLORS = {
  sistema: "text-red-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  blue: "text-blue-500",
};

const ICONS = {
  sistema: <AlertCircle size={22} />,
  green: <CheckCircle size={22} />,
  yellow: <AlertCircle size={22} />,
  blue: <MailIcon size={22} />,
};

export const NotificationCard = ({ title, message, date, color }) => {
  const normalized = color?.toLowerCase();

  return (
    <div className="flex flex-row border p-4 rounded-lg max-w-[600px] bg-[#1e1f23]">
      <div className={`flex flex-col justify-center ${COLORS[normalized]}`}>
        {ICONS[normalized]}
      </div>

      <div className="flex flex-col p-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{message}</p>
        <time className="text-gray-400">{date}</time>
      </div>
    </div>
  );
};
