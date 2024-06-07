import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type OptionsModalProps = {
  isOpen?: boolean;
  onClose?: boolean | undefined;
  children?: React.ReactNode;
};
export const OptionsModal: React.FC<OptionsModalProps> = (props) => {
  const { children } = props;

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
  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
      </div>
    </div>,
    elRef.current
  );
};
