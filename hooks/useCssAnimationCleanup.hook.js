import { useEffect } from 'react';

function useCssAnimationCleanup(reference, classes) {
  if (typeof window === 'undefined') {
    return;
  }

  useEffect(() => {
    if (reference.current === null) {
      return;
    }

    const handleAnimationEnd = () => {
      classes.forEach((className) => {
        reference.current.classList.remove(className);
      });
    };

    reference.current.addEventListener(
      'animationend',
      handleAnimationEnd,
      false
    );

    return () => {
      if (reference.current === null) {
        return;
      }

      reference.current.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [reference]);
}

export { useCssAnimationCleanup };
