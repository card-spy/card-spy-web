import { flat, isEmpty, uid } from 'radash';
import { type FC } from 'react';
import { CardResult } from './CardResult';
import { NoResults } from './NoResults';
import { CardResultSkeleton } from './CardResultSkeleton';
import { PagedSearchResults } from '@/app/card-search';

interface SearchResultsContainerProps {
  searchResults?: PagedSearchResults;
  loading?: boolean;
}

export const SearchResultsContainer: FC<SearchResultsContainerProps> = ({
  searchResults,
  loading,
}) => {
  if (loading && isEmpty(searchResults)) {
    return <CardResultSkeleton />;
  }

  if (searchResults && !isEmpty(searchResults)) {
    const flattenedResults = flat(Object.values(searchResults));
    return (
      <>
        {flattenedResults.map((card) => (
          <CardResult key={uid(100)} card={card} />
        ))}
        {loading && <CardResultSkeleton />}
      </>
    );
  }

  return <NoResults />;
};
