import { useState, useEffect } from 'react';

/**
 * Example custom hook
 * @returns boolean indicating if the component is mounted
 */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
