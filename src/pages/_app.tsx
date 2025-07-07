import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css"; //페이지별로 css가 겹치는것을 방지하기위해 css module을 사용해야함
import type { AppProps } from "next/app"
import { NextPage } from "next";
import { ReactNode } from "react";

type NextPageWithLayout=NextPage & {
  getLayout?: (page:ReactNode) => ReactNode;
};

export default function App({ Component, pageProps }: AppProps & {
 Component:NextPageWithLayout;
}) {
  const getLayout=Component.getLayout ?? ((page:ReactNode)=>page);

  return( 
    <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  ); 
}
