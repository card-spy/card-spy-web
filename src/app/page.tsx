import Image from 'next/image';
import { CardSearch } from './card-search';
import { Footer } from './footer';

interface HomeParams {
  q?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<HomeParams>;
}) {
  const { q: query } = await searchParams;

  return (
    <div className='flex flex-col items-center justify-items-center min-h-screen w-screen p-8 gap-2 divide-y divide-solid divide-black dark:divide-white font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-6 items-center sm:items-start w-full'>
        <Image
          className='w-72 invert dark:invert-0'
          src='/card-spy.svg'
          alt='Card Spy title'
          width={180}
          height={45}
          priority
        />
        <CardSearch initialQuery={query} />
      </main>
      <Footer />
    </div>
  );
}
