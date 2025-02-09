export const CardResultSkeleton = () => (
  <div className='w-full min-h-24 border-2 border-solid border-black/[.08] dark:border-white/[.145] rounded-lg p-4 bg-black/[.05] dark:bg-white/[.06]'>
    <div className='flex flex-row items-center gap-2 justify-start animate-pulse'>
      <div className='h-24 w-[69px] bg-gray-300 rounded-lg dark:bg-gray-700' />
      <div className='flex flex-col gap-1 items-left'>
        <div className='h-5 bg-gray-300 rounded-sm dark:bg-gray-700 w-48'></div>
        <div className='h-4 bg-gray-300 rounded-sm dark:bg-gray-700 w-32'></div>
        <div className='h-3 bg-gray-300 rounded-sm dark:bg-gray-700 w-28'></div>
      </div>
    </div>
  </div>
);
