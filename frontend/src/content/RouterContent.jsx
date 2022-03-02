import React, { useContext, useEffect, useMemo, useState } from "react";

const LocationContext = React.createContext();

export const useLocation = () => useContext(LocationContext).location;

export const useNavigator = () => useContext(LocationContext).navigator;

function getLocation() {
  const { pathname, hash, search } = window.location;

  // We recreate our own object
  // because window.location is mutated
  return {
    pathname,
    hash,
    search
  };
}

export default function Router({ children }) {
  const [location, setLocation] = useState(getLocation());

  useEffect(() => {
    const refreshLocation = () => {
      setLocation(getLocation());
    };

    // Refresh the location, for example when we go back
    // to the previous page
    // Even from the browser's button
    window.addEventListener("popstate", refreshLocation);

    return () => window.removeEventListener("popstate", refreshLocation);
  }, []);

  const navigator = useMemo(
    () => ({
      push(to) {
        window.history.pushState(null, null, to);
        setLocation(getLocation());
      },
      replace(to) {
        window.history.replaceState(null, null, to);
        setLocation(getLocation());
      },
      back() {
        window.history.go(-1);
      },
      forward() {
        window.history.go(1);
      },
      go(step) {
        window.history.go(step);
      }
    }),
    []
  );

  return (
    <LocationContext.Provider
      value={{
        location,
        navigator
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
