import Image from "next/image";
import { Card } from "@/api/getCards"
import { type FC } from "react"

interface CardResultProps {
    card: Card
}

export const CardResult: FC<CardResultProps> = ({ card }) => {
    return (
        <div className="flex flex-col gap-2 border border-solid border-black/[.08] dark:border-white/[.145] hover:border-white rounded-lg p-4 bg-black/[.05] dark:bg-white/[.06] w-full">
            <div className="flex gap-2 items-center">
                <Image
                    src={card.image}
                    alt={card.name}
                    height={96}
                    width={69}
                    className="rounded-lg"
                />
                <div className="flex flex-col">
                    <div className="text-lg font-bold">{card.name}</div>
                    <div className="text-sm text-gray-500">{card.set}</div>
                    <div className="text-xs text-gray-500">{card.price}</div>
                    <div className="text-sm italic text-gray-400">{card.store}</div>
                </div>
            </div>
        </div>
    )
}