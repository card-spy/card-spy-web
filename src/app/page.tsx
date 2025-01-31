import { getCards } from "@/api/getCards";
import { CardResult } from "@/components/CardResult";
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      <SearchBar onChange={getCards}/>
      <CardResult card={
        {
          name: "Laboratory Maniac",
          price: "$3.50",
          condition: "NM",
          set: "Innistrad Remastered",
          store: "Shuffle'n'Cut Games",
          image: "https://cards.scryfall.io/large/front/7/a/7a5be94c-08b8-4964-a79d-e22ea6e94be8.jpg?1736467757",
          isFoil: false,
          isBorderless: false,
          isRetro: false,
        }
      } />
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
