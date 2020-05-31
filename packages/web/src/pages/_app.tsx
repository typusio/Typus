import { AppProps } from 'next/app';
import '../styles/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
