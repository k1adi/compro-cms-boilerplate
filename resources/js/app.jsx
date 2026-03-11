import "./bootstrap";
import "../css/app.css";

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { LoadingProvider } from "./Context/LoadingContext";
import VersionMismatch from "./Components/VersionMissmatch";

const appName = import.meta.env.VITE_APP_NAME || "CMS Boilerplate";

// Store the current version in localStorage when the app loads
const storeCurrentVersion = (version) => {
  if (version) {
    localStorage.setItem("cms.boilerplate.appVersion", version);
  }
};

// Get the stored version from localStorage
const getStoredVersion = () => {
  return localStorage.getItem("cms.boilerplate.appVersion");
};

createInertiaApp({
  title: (title) => `CMS - ${title} | ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    const AppWithVersionCheck = () => {
      const [isLoading, setIsLoading] = useState(false);
      const [showVersionMismatch, setShowVersionMismatch] =
        useState(false);
      const [versionInfo, setVersionInfo] = useState({
        currentVersion: null,
        serverVersion: null,
      });

      // Check version on initial load and store it
      useEffect(() => {
        if (props?.initialPage?.props) {
          const serverVersion = props.initialPage.props.appVersion;
          const storedVersion = getStoredVersion();

              // If this is the first load or version matches, store the current version
              if (!storedVersion || storedVersion === serverVersion) {
                  storeCurrentVersion(serverVersion);
              } else if (storedVersion !== serverVersion) {
                  // Version mismatch detected
                  setVersionInfo({
                      currentVersion: storedVersion,
                      serverVersion: serverVersion,
                  });
                  setShowVersionMismatch(true);
              }
          }
      }, []);

      useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleFinish = () => setIsLoading(false);

        router.on("start", handleStart);
        router.on("finish", handleFinish);

        return () => {
          router.off("start", handleStart);
          router.off("finish", handleFinish);
        };
      }, []);

      // Create loading context value
      const loadingContextValue = {
        loading: isLoading,
        setLoading: setIsLoading,
      };

      return (
        <LoadingProvider value={loadingContextValue}>
          {showVersionMismatch && (
            <VersionMismatch
              currentVersion={versionInfo.currentVersion}
              serverVersion={versionInfo.serverVersion}
            />
          )}
          <App {...props} />
        </LoadingProvider>
      );
    };

    root.render(<AppWithVersionCheck />);
  },
  progress: false,
});
