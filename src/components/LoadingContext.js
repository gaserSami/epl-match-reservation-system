// importing dependencies
import React from "react";

// Create context
const LoadingContext = React.createContext({
  overlayLoading: false,
  setOverlayLoading: () => {}
});

// Export context
export default LoadingContext;
