import { useEffect, useState } from "react";

export function useDialogAutoClose(shouldClose) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldClose) {
      setOpen(false);
    }
  }, [shouldClose]);

  return [open, setOpen];
}
