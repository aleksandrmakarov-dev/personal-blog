
import { useImperativeHandle, useState } from "react";

export type OpenCloseHandle = {
  open: () => void;
  close: () => void;
};

const useImperativeHandleDialog = (
  ref?: React.ForwardedRef<OpenCloseHandle>
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => handleOpen(),
        close: () => handleClose(),
      };
    },
    []
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return {
    isOpen,
    setIsOpen,
    handleOpen,
    handleClose,
  };
};

export default useImperativeHandleDialog;