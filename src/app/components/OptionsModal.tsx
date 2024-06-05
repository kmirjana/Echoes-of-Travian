import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const OptionsModal = ({ children }: { children: React.ReactNode }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }
  useEffect(() => {
    const modalRoot = document.getElementById('modal') as HTMLDivElement | null;

    if (elRef.current) {
      modalRoot?.appendChild(elRef.current);
    }
    return () => {
      if (elRef.current && modalRoot) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);
  return createPortal(<div>{children}</div>, elRef.current);
};
export default OptionsModal;
