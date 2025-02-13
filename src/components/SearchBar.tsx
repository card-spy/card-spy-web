'use client';

import { Icon } from '@iconify/react';
import { debounce } from 'radash';
import { type FC } from 'react';

const INPUT_DELAY = 750;

export interface SearchBarProps {
  onChange?: (value: string) => void;
  onTypingComplete?: (value: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  onChange,
  onTypingComplete,
}) => {
  const debounceChange = debounce({ delay: INPUT_DELAY }, (value) =>
    handleTypingComplete(value)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    debounceChange(e.target.value);
  };

  const handleTypingComplete = (value: string) => {
    if (value.length > 0) {
      onTypingComplete?.(value);
    }
  };

  return (
    <div className='relative'>
      <Icon
        className='absolute top-3 left-2'
        icon='material-symbols:search-rounded'
        width='24'
        height='24'
      />
      <input
        autoFocus
        className='font-[family-name:var(--font-geist-mono)] text-black dark:text-white bg-black/[.05] dark:bg-white/[.06] px-9 py-0.5 rounded-lg border-2 border-solid border-black/[.08] dark:border-white/[.145] hover:border-black dark:hover:border-white hover:focus:border-black/[.08] text-lg w-full h-12'
        type='text'
        onChange={handleChange}
        placeholder='Search for a card...'
      />
    </div>
  );
};
