import { Header } from '@components/header/Header';
import { Content } from '@components/landing/Content';

export default function Web() {
  return (
    <div id={'home-page'} className={'flex flex-col-reverse flex-1 min-w-screen relative mb-8'}>
      <Content />
      <Header />
    </div>
  );
}
