import { type FC } from 'react';
import Image from 'next/image';

export const FallbackCard: FC = () => (
  <div className='flex h-24 min-w-[69px] items-center justify-center border border-solid border-gray-300'>
    <Image
      aria-hidden
      src='/planeswalker.svg'
      alt='Planeswalker Symbol / MTG Logo'
      width={64}
      height={64}
    />
  </div>
);
