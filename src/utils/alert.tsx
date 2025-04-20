import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";

// Styles (Tailwind-based)
const alertStyles = {
    base: `
      fixed top-6 left-1/2 transform -translate-x-1/2 
      px-6 py-4 rounded-xl shadow-2xl 
      transition-all duration-300 ease-out z-50 
      flex items-center gap-3 text-base
      backdrop-blur-sm border border-white/10
      animate-fade-slide-in
    `,
    success: "bg-green-500/90 text-white",
    error: "bg-red-500/90 text-white",
  };

export type AlertType = "success" | "error";

let showAlertFn: (message: string, type?: AlertType) => void;

export function showAlert(message: string, type: AlertType = "success") {
  if (showAlertFn) showAlertFn(message, type);
}

export default function AlertPortal() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("success");

  useEffect(() => {
    showAlertFn = (msg: string, alertType: AlertType = "success") => {
      setMessage(msg);
      setType(alertType);
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    };
  }, []);

  if (!visible) return null;

  return createPortal(
    <div
      className={clsx(
        alertStyles.base,
        type === "success" ? alertStyles.success : alertStyles.error
      )}
    >
      {message}
    </div>,
    document.body
  );
}
