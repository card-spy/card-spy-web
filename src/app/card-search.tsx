'use client'

import { Card, getCards } from "@/api/getCards"
import { CardResult } from "@/components/CardResult"
import { SearchBar } from "@/components/SearchBar"
import { uid } from "radash"
import { FC, useState } from "react"

interface CardSearchProps {

}

export const CardSearch: FC<CardSearchProps> = ({ }) => {

    const [searchResults, setSearchResults] = useState<Card[]>([])

    const handleChange = async (query: string) => {
        setSearchResults(await getCards(query))
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <SearchBar onChange={handleChange} />
            {searchResults.map((card) => <CardResult key={uid(100)} card={card} />)}
        </div>
    )

}