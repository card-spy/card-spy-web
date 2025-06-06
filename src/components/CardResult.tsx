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
      className='flex min-h-24 w-full flex-row items-start justify-between rounded-lg border-2 border-solid border-white/[.145] bg-white/[.06] p-4 transition-colors duration-300 hover:border-white hover:bg-black'
    >
      <div className='flex flex-row items-center gap-2'>
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
        <div className='items-left flex flex-col'>
          <div className='text-sm font-bold sm:text-lg'>{card.name} </div>
          <div className='text-xs text-gray-500 sm:text-sm'>{card.set}</div>
          <div className='text-xs italic text-gray-400 sm:text-sm'>
            {card.storeName}
          </div>
          {card.isFoil && (
            <div className='flex flex-row items-center text-xs text-amber-400 sm:text-sm'>
              Foil
              <Icon icon='fluent:sparkle-20-regular' width='20' height='20' />
            </div>
          )}
        </div>
      </div>
      <div className='flex w-fit flex-col items-end gap-2'>
        <div className='text-lg text-gray-100 sm:text-xl'>{card.price}</div>
      </div>
    </a>
  );
};
