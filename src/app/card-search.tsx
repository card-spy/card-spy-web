'use client'

import { Card, getCards } from "@/api/getCards"
import { CardResult } from "@/components/CardResult"
import { SearchBar } from "@/components/SearchBar"
import { debounce, uid } from "radash"
import { FC, useEffect, useState, useTransition } from "react"

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

    const handleScroll = () => {
        const reachedBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

        if (reachedBottom && !isPending) {
            setPageNumber(pageNumber + 1);
        }
    }

    const debounceScroll = debounce({ delay: 100 }, handleScroll);

    useEffect(() => {
        window.addEventListener('scroll', debounceScroll);

        return () => {
            window.removeEventListener('scroll', debounceScroll);
        }
    });

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
            <SearchBar onChange={handleChange} onTypingComplete={handleTypingComplete} />
            {searchResults.map((card) => <CardResult key={uid(100)} card={card} />)}
        </div>
    )

}