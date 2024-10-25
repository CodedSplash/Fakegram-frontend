import { useEffect, useState } from 'react';

export const useAuthElementsSizes = () => {
  const [inputSize, setInputSize] = useState<'small' | 'medium'>('medium');
  const [buttonSize, setButtonSize] = useState<'small' | 'medium' | 'large'>('large');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992 && !(window.innerWidth < 600)) {
        setButtonSize('medium');
      } else if (window.innerWidth <= 600) {
        setInputSize('small');
        setButtonSize('small');
      } else {
        setButtonSize('large');
        setInputSize('medium');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { authInputSize: inputSize, authButtonSize: buttonSize };
};
