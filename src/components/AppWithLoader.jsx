import React, { useState, useEffect } from "react";

export default function AppWithLoader({ children }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setLoading(true);
      localStorage.setItem("hasVisited", "true");

      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // ⏱ Adjust time if needed

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-[#008236] border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
