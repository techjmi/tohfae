//this is a custom hook which will be used to handle the device detection of the app
import { useEffect, useState } from "react";

export const useDevice = () => {
  const [device, setDevice] = useState("desktop"); // default for SSR
  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice("mobile");
      else if (width < 1024) setDevice("tablet");
      else setDevice("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
};
