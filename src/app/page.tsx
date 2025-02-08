import Image from 'next/image';
import { CardSearch } from './card-search';
import { Footer } from './footer';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-items-center min-h-screen w-screen p-8 gap-2 divide-y divide-solid divide-white font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-6 items-center sm:items-start w-full'>
        <Image
          className='w-72'
          src='/card-spy.svg'
          alt='Card Spy title'
          width={180}
          height={45}
          priority
        />
        <CardSearch />
      </main>
      <Footer />
    </div>
  );
}
