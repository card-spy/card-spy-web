import { type FC } from 'react';
import Image from 'next/image';

export const Footer: FC = () => (
  <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
    <a
      className='flex items-center gap-2 hover:underline hover:underline-offset-4'
      href='https://github.com/card-spy/card-spy-web'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Image
        aria-hidden
        src='/window.svg'
        alt='Window icon'
        width={16}
        height={16}
      />
      Github Repo
    </a>
  </footer>
);
