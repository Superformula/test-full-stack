import { debounce } from 'lodash';
import { useCallback } from 'react';

const useScrollPosition = () => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');

  const save = debounce((offset: string) => {
    sessionStorage.setItem('scrollPosition', offset);
  }, 300);

  const saveScrollPosition = useCallback(() => {
    save(window.pageYOffset.toString());
  }, [save]);

  const loadScrollPosition = useCallback(() => {
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem('scrollPosition');
    }
  }, [scrollPosition]);

  return {
    loadScrollPosition,
    saveScrollPosition,
  };
};

export default useScrollPosition;
