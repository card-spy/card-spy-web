'use client'

import { Card, getCards } from "@/api/getCards"
import { CardResult } from "@/components/CardResult"
import { SearchBar } from "@/components/SearchBar"
import { uid } from "radash"
import { FC, useState } from "react"

export const CardSearch: FC = () => {
    const [searchResults, setSearchResults] = useState<Card[]>([]);

    const handleChange = (query: string) => {
        if (!query || query.length === 0) {
            setSearchResults([]);
        };
    }

    const handleTypingComplete = async (query: string) => {
        if (query.length > 0) {
            setSearchResults(await getCards(query));
        }
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <SearchBar onChange={handleChange} onTypingComplete={handleTypingComplete} />
            {searchResults.map((card) => <CardResult key={uid(100)} card={card} />)}
        </div>
    )

}