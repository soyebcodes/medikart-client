import React, { useState, useEffect } from "react";

export default function AppWithLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (you can adjust or remove timeout)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        <div className="w-16 h-16 border-4 border-[#008236] border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return <>{children}</>;
}
