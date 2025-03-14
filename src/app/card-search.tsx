'use client';

import { Card, getCards } from '@/api/getCards';
import { CardResult } from '@/components/CardResult';
import { CardResultSkeleton } from '@/components/CardResultSkeleton';
import { NoResults } from '@/components/NoResults';
import { ScrollHandler } from '@/components/ScrollHandler';
import { SearchBar } from '@/components/SearchBar';
import { uid } from 'radash';
import { type FC, useEffect, useState, useTransition } from 'react';

const MIN_LENGTH = 3;

const updateUrl = (query: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set('q', query);
  window.history.pushState({}, '', url.toString());
};

interface CardSearchProps {
  initialQuery?: string;
}

export const CardSearch: FC<CardSearchProps> = ({ initialQuery = '' }) => {
  const [searchResults, setSearchResults] = useState<Card[][]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const resetSearch = () => {
    setSearchResults([]);
    setPageNumber(1);
    setIsLastPage(false);
  };

  const handleChange = (query: string) => {
    if (!query || query.length === 0) {
      resetSearch();
      setSearchQuery('');
    }
  };

  const handleTypingComplete = (query: string) => {
    if (query.length >= MIN_LENGTH) {
      resetSearch();
      setSearchQuery(query);
      updateUrl(query);
    }
  };

  const handleScrollToBottom = () => {
    if (!isPending && !isLastPage) {
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  };

  const updateSearchResults = (query: string, page: number) =>
    startTransition(async () => {
      const cardData = await getCards(query, page);
      if (cardData.length > 0) {
        setSearchResults((searchResults) => {
          const newPages = searchResults.slice(0);
          newPages[page] = cardData;
          return newPages;
        });
      } else {
        setIsLastPage(true);
      }
    });

  useEffect(() => {
    if (searchQuery.length > 0) {
      updateSearchResults(searchQuery, pageNumber);
    }
  }, [searchQuery, pageNumber]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <ScrollHandler onReachedBottom={handleScrollToBottom} />
      <SearchBar
        defaultValue={searchQuery}
        onChange={handleChange}
        onTypingComplete={handleTypingComplete}
      />
      {searchResults.flat().map((card) => (
        <CardResult key={uid(100)} card={card} />
      ))}
      {isPending && searchResults.length === 0 && <CardResultSkeleton />}
      {!isPending && searchResults.length === 0 && searchQuery.length > 0 && (
        <NoResults />
      )}
    </div>
  );
};
