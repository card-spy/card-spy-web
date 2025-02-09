export const NoResults = () => (
  <div className='flex flex-col gap-2 p-3 items-start justify-center w-full h-full border-2 border-solid border-black dark:border-white/[.5]'>
    <div className='text-2xl font-bold'>No results - try a different card!</div>
    <div className='text-lg italic'>{'"Not all who wander are lost..."'}</div>
  </div>
);
