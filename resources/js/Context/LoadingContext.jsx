import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children, value }) {
  const [loading, setLoading] = useState(false);

  // Use provided value if available, otherwise use internal state
  const contextValue = value || { loading, setLoading };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context; // Returns an object with { loading, setLoading }
}
