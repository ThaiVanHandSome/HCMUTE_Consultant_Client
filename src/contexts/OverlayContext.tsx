import { Spinner } from "@nextui-org/react";
import { ReactNode, createContext, useContext, useRef, useMemo } from "react";

type OverlayContextType = [() => void, () => void];

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const openOverlay = () => {
    if (parentRef.current && overlayRef.current && spinnerRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      spinnerRef.current.style.display = "block";
      console.log(`-${Math.floor(rect.top)}px`);
      overlayRef.current.style.top = `${-1 * Math.floor(rect.top + 1)}px`;
      overlayRef.current.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  };

  const hideOverlay = () => {
    if (overlayRef.current && spinnerRef.current) {
      spinnerRef.current.style.display = "none";
      overlayRef.current.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  const contextValue: OverlayContextType = useMemo(
    () => [openOverlay, hideOverlay],
    [openOverlay, hideOverlay]
  );

  return (
    <OverlayContext.Provider value={contextValue}>
      <div className="relative" ref={parentRef}>
        <div
          ref={overlayRef}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
          className="hidden absolute left-0 w-full h-[100vh] z-40"
        >
          <div>
            <Spinner
              ref={spinnerRef}
              color="primary"
              className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            />
          </div>
        </div>
        {children}
      </div>
    </OverlayContext.Provider>
  );
};
