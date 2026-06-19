import { useEffect, useState } from "react";

export const useIsPortrait = (): boolean => {
  const getIsPortrait = () =>
    window.matchMedia("(orientation: portrait)").matches;

  const [isPortrait, setIsPortrait] = useState(getIsPortrait);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");

    const handler = (event: MediaQueryListEvent) => {
      setIsPortrait(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return isPortrait;
};
