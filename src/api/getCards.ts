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
  storeName: string;
  storeLink: string;
  image: string;
  isFoil: boolean;
  isBorderless: boolean;
  isRetro: boolean;
}

export const getCards = async (
  query: string,
  pageNumber: number = 1
): Promise<Card[]> => {
  const encodedQueryString = encodeURIComponent(query);

  const urlQuery = `https://api.mtgsingles.co.nz/MtgSingle?query=${encodedQueryString}&page=${pageNumber}&pageSize=20&Country=1`;

  const res = await fetch(urlQuery, {
    "credentials": "omit",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Origin": "https://mtgsingles.co.nz",
        "Referer": "https://mtgsingles.co.nz/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site"
    },
    "referrer": "https://mtgsingles.co.nz/",
    "method": "GET",
    "mode": "cors"
  })
    .then((response) => (response.body ? response.json() : []))
    .catch((error) => {
      console.error(error);
      return [];
    });

  return transformResponse(res);
};

const transformResponse = (cards: CardResponse[]): Card[] => {
  const filteredCards = cards.filter((card) => card.tcgType === 'MTG');

  return filteredCards.map((card) => ({
    name: card.title,
    price: card.price,
    condition: card.condition,
    set: card.setName,
    storeName: parseStoreName(card.store),
    storeLink: card.url,
    image: card.imageUrl,
    isFoil:
      card.features.includes('Foil') || card.features.includes('Foil-Etched'),
    isBorderless: card.features.includes('Borderless'),
    isRetro: card.features.includes('Retro'),
  }));
};

const parseStoreName = (store: string): string => {
  const storeNameSanitised = store.replace('NZ/', '').trim();

  const storeName = storeNameSanitised.split(/(?=[A-Z])/).join(' ');

  return storeName;
};
