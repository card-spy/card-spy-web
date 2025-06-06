'use client';

import { Card, getCards } from '@/api/getCards';
import { ScrollHandler } from '@/components/ScrollHandler';
import { SearchBar } from '@/components/SearchBar';
import { SearchResultsContainer } from '@/components/SearchResultsContainer';
import { type FC, useEffect, useState, useTransition } from 'react';

const MIN_LENGTH = 3;

const updateUrl = (query: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set('q', query);
  window.history.pushState({}, '', url.toString());
};

const resetUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete('q');
  window.history.pushState({}, '', url.toString());
};

interface CardSearchProps {
  initialQuery?: string;
}

export const CardSearch: FC<CardSearchProps> = ({ initialQuery = '' }) => {
  const [searchResults, setSearchResults] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const resetSearch = () => {
    setSearchResults([]);
    setPageNumber(1);
    setIsLastPage(false);
    resetUrl();
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
        setSearchResults((searchResults) => [...searchResults, ...cardData]);
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
    <div className='flex flex-col gap-2 w-clamp'>
      <ScrollHandler onReachedBottom={handleScrollToBottom} />
      <SearchBar
        defaultValue={searchQuery}
        onChange={handleChange}
        onTypingComplete={handleTypingComplete}
      />
      {searchQuery.length > 0 && (
        <SearchResultsContainer
          searchResults={searchResults}
          loading={isPending}
        />
      )}
    </div>
  );
};
