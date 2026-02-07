import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-[#1f2e18] border border-primary/30 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <Icon icon="material-symbols:check-circle" className="text-primary text-xl" />
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
