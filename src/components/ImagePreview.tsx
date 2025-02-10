import { RefObject, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import { CARD_IMAGE_WIDTH, CARD_IMAGE_HEIGHT } from './CardResult';

export const ImagePreview = ({
  cardImageUrl,
  triggerRef,
}: {
  cardImageUrl: string;
  triggerRef: RefObject<HTMLImageElement | null>;
}) => {
  const [state, setState] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    setState({
      left: (triggerRef?.current?.offsetLeft || 0) + CARD_IMAGE_WIDTH * 1.25,
      top: (triggerRef?.current?.offsetTop || 0) - CARD_IMAGE_HEIGHT * 1.5,
    });
  }, [triggerRef]);

  return (
    <Image
      src={cardImageUrl}
      height={CARD_IMAGE_HEIGHT * 4}
      width={CARD_IMAGE_WIDTH * 4}
      alt=''
      className='absolute z-10 rounded-lg'
      style={{
        top: state.top,
        left: state.left,
      }}
    />
  );
};
