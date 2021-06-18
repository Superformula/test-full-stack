import { useCallback, useState } from 'react';

const useToggle = (
  defaultValue = false,
): [boolean, () => void, () => void, (
  ) => void] => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback(() => setIsOpen((prevState) => !prevState), []);

  return [isOpen, open, close, toggle];
};

export default useToggle;
