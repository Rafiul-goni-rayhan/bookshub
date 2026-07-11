"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1F2937",
          color: "#F9FAFB",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: "0.75rem",
          padding: "1rem",
          fontSize: "0.95rem",
        },
      }}
    />
  );
}
