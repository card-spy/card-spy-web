'use client';

import { debounce } from "radash";
import { type FC } from "react";

const INPUT_DELAY = 300;

export interface SearchBarProps {
    onChange?: (value: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onChange }) => {
    const debounceChange = debounce({ delay: INPUT_DELAY }, (value) => value && onChange?.(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceChange(e.target.value);
    }

    return <input
        className="font-[family-name:var(--font-geist-mono)] text-white bg-black/[.05] dark:bg-white/[.06] px-2 py-0.5 rounded border border-solid border-black/[.08] dark:border-white/[.145] text-lg w-full h-12"
        type="text"
        onChange={handleChange}
        placeholder="Search for a card..."
    />
}