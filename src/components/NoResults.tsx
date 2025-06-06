export const NoResults = () => (
  <div className='flex h-full w-full flex-col items-start justify-center gap-2 border-2 border-solid border-white/[.5] p-3'>
    <div className='text-2xl font-bold'>No results - try a different card!</div>
    <div className='text-lg italic'>{'"Not all who wander are lost..."'}</div>
  </div>
);
