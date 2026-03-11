import React from "react";

export default function VersionMismatch({ currentVersion, serverVersion }) {
  const handleRefresh = () => {
    // Clear cache and reload using a more reliable approach
    // First, clear localStorage version to force a new version check
    localStorage.removeItem("cms.boilerplate.appVersion");

    // Then reload the page with cache-busting parameters
    const cacheBuster = new Date().getTime();
    window.location.href = window.location.pathname + "?v=" + cacheBuster;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-yellow-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Application Update Required
          </h2>

          <p className="text-gray-600 mb-6">
            The application has been updated. Please refresh your browser to
            load the latest version.
          </p>

          <div className="text-sm text-gray-500 mb-6">
            <p>Current version: {currentVersion || "Unknown"}</p>
            <p>Latest version: {serverVersion || "Unknown"}</p>
          </div>

          <button
            onClick={handleRefresh}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors"
          >
            Refresh Now
          </button>
        </div>
      </div>
    </div>
  );
}
