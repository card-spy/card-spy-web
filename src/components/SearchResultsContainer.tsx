import { Card } from '@/api/getCards';
import { uid } from 'radash';
import { type FC } from 'react';
import { CardResult } from './CardResult';
import { NoResults } from './NoResults';
import { CardResultSkeleton } from './CardResultSkeleton';

interface SearchResultsContainerProps {
  searchResults?: Card[];
  loading?: boolean;
}

export const SearchResultsContainer: FC<SearchResultsContainerProps> = ({
  searchResults,
  loading,
}) => {
  if (loading) {
    return <CardResultSkeleton />;
  }

  if (searchResults) {
    return searchResults.map((card) => (
      <CardResult key={uid(100)} card={card} />
    ));
  }

  return <NoResults />;
};
