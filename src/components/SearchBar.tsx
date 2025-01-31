'use client';

import { type FC } from "react";

export interface SearchBarProps {
    onChange?: (value: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onChange }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }

    return <input className="font-[family-name:var(--font-geist-mono)] text-white bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded border border-solid border-black/[.08] dark:border-white/[.145] text-lg w-full h-12" type="text" onChange={handleChange} />
}