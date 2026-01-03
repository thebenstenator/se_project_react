import { useEffect, useCallback } from "react";

export function useModalHandlers(activeModal, name, handleClose, options = {}) {
  const { esc = true } = options;

  useEffect(() => {
    if (!esc || activeModal !== name) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeModal, name, handleClose, esc]);

  const handleOverlayMouseDown = useCallback(
    (e) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose]
  );

  return { handleOverlayMouseDown };
}
