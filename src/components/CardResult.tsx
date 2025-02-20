import Image from 'next/image';
import { Card } from '@/api/getCards';
import { useRef, useState, type FC } from 'react';
import { FallbackCard } from './FallbackCard';
import { ImagePreview } from './ImagePreview';
import { Icon } from '@iconify/react';
import { Base64PlaceholderImage } from './Base64PlaceholderImage';

export const CARD_IMAGE_HEIGHT = 96;
export const CARD_IMAGE_WIDTH = 69;

interface CardResultProps {
  card: Card;
}

export const CardResult: FC<CardResultProps> = ({ card }) => {
  const [imageHasError, setImageHasError] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  if (!imageHasError && card.image.trim().length === 0) {
    setImageHasError(true);
  }

  return (
    <a
      href={card.storeLink}
      target='_blank'
      rel='noopener noreferrer'
      className='flex flex-row items-start justify-between w-full min-h-24 border-2 border-solid border-black/[.08] dark:border-white/[.145] hover:border-black dark:hover:border-white rounded-lg p-4 bg-black/[.05] dark:bg-white/[.06] hover:bg-gray-50 dark:hover:bg-black transition-colors duration-300'
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
            ref={imageRef}
            placeholder={Base64PlaceholderImage}
            className='rounded-lg'
            onError={() => setImageHasError(true)}
            onMouseOver={() => setShowImagePreview(true)}
            onMouseLeave={() => setShowImagePreview(false)}
          />
        )}
        {showImagePreview && (
          <ImagePreview cardImageUrl={card.image} triggerRef={imageRef} />
        )}
        <div className='flex flex-col items-left'>
          <div className='text-sm sm:text-lg font-bold'>{card.name} </div>
          <div className='text-xs sm:text-sm text-gray-500'>{card.set}</div>
          <div className='text-xs sm:text-sm italic text-gray-400'>
            {card.storeName}
          </div>
          {card.isFoil && (
            <div className='flex flex-row items-center text-xs sm:text-sm text-orange-600 dark:text-amber-400'>
              Foil
              <Icon icon='fluent:sparkle-20-regular' width='20' height='20' />
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-2 items-end w-fit'>
        <div className='text-lg sm:text-xl dark:text-gray-100'>
          {card.price}
        </div>
      </div>
    </a>
  );
};
