export const CardResultSkeleton = () => (
  <div className='w-full min-h-24 border-2 border-solid border-white/[.145] rounded-lg p-4 bg-white/[.06]'>
    <div className='flex flex-row items-center gap-2 justify-start animate-pulse'>
      <div className='h-24 w-[69px] rounded-lg bg-gray-700' />
      <div className='flex flex-col gap-1 items-left'>
        <div className='h-5 rounded-sm bg-gray-700 w-48'></div>
        <div className='h-4 rounded-sm bg-gray-700 w-32'></div>
        <div className='h-3 rounded-sm bg-gray-700 w-28'></div>
      </div>
    </div>
  </div>
);
