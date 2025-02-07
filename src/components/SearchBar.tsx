'use client';

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
    <input
      className="font-[family-name:var(--font-geist-mono)] text-white bg-black/[.05] dark:bg-white/[.06] px-2 py-0.5 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] hover:border-white hover:focus:border-black/[.08] text-lg w-full h-12"
      type="text"
      onChange={handleChange}
      placeholder="Search for a card..."
    />
  );
};
