import Image from 'next/image';
import { CardSearch } from './card-search';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen w-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 items-center sm:items-start w-full">
        <Image
          className='w-72'
          src="/card-spy.svg"
          alt="Card Spy title"
          width={180}
          height={45}
          priority
        />
        <CardSearch />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/card-spy/card-spy-web"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Github Repo
        </a>
      </footer>
    </div>
  );
}
