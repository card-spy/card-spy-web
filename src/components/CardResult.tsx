import Image from 'next/image';
import { Card } from '@/api/getCards';
import { useState, type FC } from 'react';

interface CardResultProps {
  card: Card;
}

const FallbackCard: FC = () => (
  <div className='flex justify-center items-center h-24 w-[69px] border border-solid border-gray-300'>
    <Image
      aria-hidden
      src='/planeswalker.svg'
      alt='Planeswalker Symbol / MTG Logo'
      width={64}
      height={64}
    />
  </div>
);

export const CardResult: FC<CardResultProps> = ({ card }) => {
  const [imageHasError, setImageHasError] = useState(false);

  if (!imageHasError && card.image.trim().length === 0) {
    setImageHasError(true);
  }

  return (
    <a
      href='https://github.com/card-spy/card-spy-web'
      target='_blank'
      rel='noopener noreferrer'
      className='flex flex-row items-start justify-between w-full min-h-24 border-2 border-solid border-black/[.08] dark:border-white/[.145] hover:border-white rounded-lg p-4 bg-black/[.05] dark:bg-white/[.06] hover:bg-black transition-colors duration-300'
    >
      <div className='flex flex-row gap-2 items-center'>
        {imageHasError ? (
          <FallbackCard />
        ) : (
          <Image
            src={card.image}
            alt={card.name}
            height={96}
            width={69}
            className='rounded-lg'
            onError={() => setImageHasError(true)}
          />
        )}
        <div className='flex flex-col items-left'>
          <div className='text-lg font-bold'>{card.name}</div>
          <div className='text-sm text-gray-500'>{card.set}</div>
          <div className='text-sm italic text-gray-400'>{card.store}</div>
        </div>
      </div>
      <div className='flex flex-col gap-2 items-end w-fit'>
        <div className='text-xl text-gray-100'>{card.price}</div>
      </div>
    </a>
  );
};
