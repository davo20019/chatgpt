import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ReactGA from 'react-ga';

/**
 * This is the Google Analytics property ID.
 * Update this to your own property ID.
 */
const propertyId = process.env.PROPERTY_ID;
export default function App({ Component, pageProps }: AppProps) {
  ReactGA.initialize(propertyId);
  if (typeof window !== 'undefined') {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  return <Component {...pageProps} />
}
