import Image from 'next/image';
import { CardSearch } from './card-search';
import { Footer } from './footer';
import { userAgent } from 'next/server';
import { headers } from 'next/headers';

interface HomeParams {
  q?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<HomeParams>;
}) {
  const { q: query } = await searchParams;
  const { os } = userAgent({ headers: await headers() });

  return (
    <div className='flex flex-col items-center justify-items-center min-h-screen w-screen p-4 gap-2 divide-y divide-solid divide-white font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col flex-grow gap-2 sm:justify-center items-center w-full'>
        <div className='flex flex-row items-center justify-center gap-2 w-full'>
          <Image
            className='w-20 hidden sm:block'
            src='/icon.png'
            alt='Card Spy icon'
            width={180}
            height={45}
            priority
          />
          <p className='text-7xl font-bold text-peach font-[family-name:var(--font-racing-sans-one)]'>
            CARD SPY
          </p>
        </div>
        <CardSearch initialQuery={query} />
      </main>
      <Footer showCopyleftIcon={!os.name?.includes('Windows')} />
    </div>
  );
}
