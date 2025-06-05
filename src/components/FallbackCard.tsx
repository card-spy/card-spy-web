import { type FC } from 'react';
import Image from 'next/image';

export const FallbackCard: FC = () => (
  <div className='flex justify-center items-center h-24 min-w-[69px] border border-solid border-gray-300'>
    <Image
      aria-hidden
      src='/planeswalker.svg'
      alt='Planeswalker Symbol / MTG Logo'
      width={64}
      height={64}
    />
  </div>
);
