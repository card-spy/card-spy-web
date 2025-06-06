export const CardResultSkeleton = () => (
  <div className='min-h-24 w-full rounded-lg border-2 border-solid border-white/[.145] bg-white/[.06] p-4'>
    <div className='flex animate-pulse flex-row items-center justify-start gap-2'>
      <div className='h-24 w-[69px] rounded-lg bg-gray-700' />
      <div className='items-left flex flex-col gap-1'>
        <div className='h-5 w-48 rounded-sm bg-gray-700'></div>
        <div className='h-4 w-32 rounded-sm bg-gray-700'></div>
        <div className='h-3 w-28 rounded-sm bg-gray-700'></div>
      </div>
    </div>
  </div>
);
