import { debounce } from 'radash';
import { type FC, useEffect } from 'react';

interface ScrollHandlerProps {
  onScroll?: () => void;
  onReachedBottom?: () => void;
}

export const ScrollHandler: FC<ScrollHandlerProps> = ({
  onScroll,
  onReachedBottom,
}) => {
  const handleScroll = () => {
    const reachedBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    onScroll?.();

    if (reachedBottom) {
      onReachedBottom?.();
    }
  };

  const debounceScroll = debounce({ delay: 100 }, handleScroll);

  useEffect(() => {
    window.addEventListener('scroll', debounceScroll);

    return () => {
      window.removeEventListener('scroll', debounceScroll);
    };
  });

  return <></>;
};
