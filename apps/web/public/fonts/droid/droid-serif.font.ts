import localFont from 'next/font/local';

export const droidFont = localFont({
  src: [
    {
      path: './ttf/DroidSerif.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ttf/DroidSerif-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './ttf/DroidSerif-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './ttf/DroidSerif-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-droid',
});
