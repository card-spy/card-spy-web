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
    <div className='flex min-h-screen w-screen flex-col items-center justify-items-center gap-2 divide-y divide-solid divide-white p-4 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex w-full flex-grow flex-col items-center gap-2 sm:justify-center'>
        <div className='flex w-full flex-row items-center justify-center gap-2'>
          <Image
            className='hidden w-20 sm:block'
            src='/icon.png'
            alt='Card Spy icon'
            width={180}
            height={45}
            priority
          />
          <p className='font-[family-name:var(--font-racing-sans-one)] text-7xl font-bold text-peach'>
            CARD SPY
          </p>
        </div>
        <CardSearch initialQuery={query} />
      </main>
      <Footer showCopyleftIcon={!os.name?.includes('Windows')} />
    </div>
  );
}
