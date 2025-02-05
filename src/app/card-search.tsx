'use client'

import { Card, getCards } from "@/api/getCards"
import { CardResult } from "@/components/CardResult"
import { ScrollHandler } from "@/components/ScrollHandler"
import { SearchBar } from "@/components/SearchBar"
import { uid } from "radash"
import { type FC, useEffect, useState, useTransition } from "react"

const MIN_LENGTH = 3;

export const CardSearch: FC = () => {
    const [searchResults, setSearchResults] = useState<Card[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [isPending, startTransition] = useTransition();

    const handleChange = (query: string) => {
        if (!query || query.length === 0) {
            setSearchResults([]);
            setSearchQuery('');
            setPageNumber(1);
        };
    }

    const handleTypingComplete = (query: string) => {
        if (query.length >= MIN_LENGTH) {
            setSearchQuery(query);
        }
    }

    const handleScrollToBottom = () => {
        if (!isPending) {
            setPageNumber((pageNumber) => pageNumber + 1);
        }
    }

    useEffect(() => {
        async function updateSearchResults() {
            startTransition(async () => {
                const cardData = await getCards(searchQuery, pageNumber);
                setSearchResults(searchResults => [...searchResults, ...cardData]);
            })
        }
        updateSearchResults();
    }, [searchQuery, pageNumber]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <ScrollHandler onReachedBottom={handleScrollToBottom} />
            <SearchBar onChange={handleChange} onTypingComplete={handleTypingComplete} />
            {searchResults.map((card) => <CardResult key={uid(100)} card={card} />)}
        </div>
    )

}