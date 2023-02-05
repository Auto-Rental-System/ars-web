import { AppProps } from 'next/app';

export { default as Routing } from './Routing';

export type RoutingProps = {} & Pick<AppProps, 'Component' | 'pageProps'>;
