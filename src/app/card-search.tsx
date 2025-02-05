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

    const resetSearch = () => {
        setSearchResults([])
        setPageNumber(1)
    }

    const handleChange = (query: string) => {
        if (!query || query.length === 0) {
            resetSearch();
            setSearchQuery('');
        };
    }

    const handleTypingComplete = (query: string) => {
        if (query.length >= MIN_LENGTH) {
            resetSearch();
            setSearchQuery(query);
        }
    }

    const handleScrollToBottom = () => {
        if (!isPending) {
            setPageNumber((pageNumber) => pageNumber + 1);
        }
    }

    const updateSearchResults = (query: string, page: number) => startTransition(async () => {
        const cardData = await getCards(query, page);
        if (cardData.length > 0) {
            setSearchResults(searchResults => [...searchResults, ...cardData]);
        }
    })

    useEffect(() => {
        if (searchQuery.length > 0) {
            updateSearchResults(searchQuery, pageNumber);
        }
    }, [searchQuery, pageNumber]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <ScrollHandler onReachedBottom={handleScrollToBottom} />
            <SearchBar onChange={handleChange} onTypingComplete={handleTypingComplete} />
            {searchResults.map((card) => <CardResult key={uid(100)} card={card} />)}
        </div>
    )

}