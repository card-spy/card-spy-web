import { type FC } from 'react';
import { Icon } from '@iconify/react';

export const Footer: FC = () => (
  <footer className='row-start-3 flex flex-row p-2 gap-6 w-full flex-wrap items-center justify-between'>
    <a
      className='flex items-center gap-2 hover:underline hover:underline-offset-4'
      href='https://github.com/card-spy/card-spy-web'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon icon='mdi:github' width='24' height='24' />
      View Github Repo
    </a>
    Copyleft 🄯 Matthew Eden {new Date().getFullYear()}
  </footer>
);
