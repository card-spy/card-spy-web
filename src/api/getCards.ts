'use server';

interface CardResponse {
    store: string;
    tcgType: string;
    setName: string;
    title: string;
    condition: string;
    price: string;
    url: string;
    imageUrl: string;
    features: string[];
}

export interface Card {
    name: string;
    price: string;
    condition: string;
    set: string;
    store: string;
    image: string;
    isFoil: boolean;
    isBorderless: boolean;
    isRetro: boolean;
}

export const getCards = async (query: string): Promise<Card[]> => {
    const encodedQueryString = encodeURIComponent(query);

    const urlQuery = `https://www.mtgsingles.co.nz:14567/MtgSingle?query=${encodedQueryString}&page=1&pageSize=20&Country=1`

    const res = await fetch(urlQuery)
    .then(response => response.body ? response.json() : [])
    .catch(error => {
        console.error(error);
        return [];
    });

    return transformResponse(res);
}

const transformResponse = (cards: CardResponse[]): Card[] => {
    return cards.map((card) => ({
        name: card.title,
        price: card.price,
        condition: card.condition,
        set: card.setName,
        store: card.store,
        image: card.imageUrl,
        isFoil: card.features.includes('Foil'),
        isBorderless: card.features.includes('Borderless'),
        isRetro: card.features.includes('Retro'),
    }))
}