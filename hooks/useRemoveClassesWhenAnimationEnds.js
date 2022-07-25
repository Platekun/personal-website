import { useEffect } from 'react';

function useRemoveClassesWhenAnimationEnds({ reference, classes }) {
  useEffect(() => {
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

export { useRemoveClassesWhenAnimationEnds };
