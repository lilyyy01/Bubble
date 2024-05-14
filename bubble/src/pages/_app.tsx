import "@/styles/globals.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, MantineProvider, MantineColorsTuple, rem } from '@mantine/core';

//import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { EdgeStoreProvider } from './lib/edgestore';

import React from 'react' // this to remove type error

// import { getServerSession } from "next-auth/next";
// const session = await getServerSession(options);

/**export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}**/

const brightPink: MantineColorsTuple = [
  '#ffeaf8',
  '#fcd5e9',
  '#f1abce',
  '#e77cb2',
  '#de569a',
  '#da3d8b',
  '#d82f84',
  '#c02171',
  '#ac1966',
  '#980958'
];

const brightOrange: MantineColorsTuple = [
  '#fff4e2',
  '#fde7d0',
  '#f5d0a3',
  '#efb574',
  '#e99f4c',
  '#e69131',
  '#e48a22',
  '#cb7714',
  '#b5680d',
  '#9e5900'
];

const backgroundColor: MantineColorsTuple = [
  '#edf6fc',
  '#dbe9f4',
  '#b2d3ea',
  '#86bbe2',
  '#63a6db',
  '#4f9ad7',
  '#4393d6',
  '#357fbe',
  '#2a72aa',
  '#176297'
];

const periwinkle: MantineColorsTuple = [
  '#ecefff',
  '#d6d9f8',
  '#abb0ef',
  '#7c84e5',
  '#555fdf',
  '#3d48db',
  '#303cd9',
  '#232ec1',
  '#1c29ad',
  '#112299'
];

const columbiaBlue: MantineColorsTuple = [
  '#e8f7ff',
  '#d6eaf8',
  '#add3ee',
  '#80bae5',
  '#5ca6de',
  '#4599da',
  '#3893d8',
  '#2980c1',
  '#1c71ad',
  '#00629a'
];

const ultraViolet: MantineColorsTuple = [
  '#f3f3f7',
  '#e4e4e7',
  '#c5c6cf',
  '#a4a6b9',
  '#898ca5',
  '#777b9a',
  '#6e7295',
  '#5c6182',
  '#525675',
  '#454a68'
];

const lemonChiffon: MantineColorsTuple = [
  '#fffde6',
  '#fffbd0',
  '#fff79f',
  '#fff369',
  '#fff040',
  '#ffed28',
  '#ffec1c',
  '#e3d10f',
  '#c9ba00',
  '#ada000'
];

const jonquil: MantineColorsTuple = [
  '#fffbe3',
  '#fff6cd',
  '#ffeb9c',
  '#ffe066',
  '#ffd73b',
  '#ffd120',
  '#ffce10',
  '#e3b600',
  '#c9a100',
  '#ae8b00'
];



const theme = createTheme({
  colors: {
    brightPink,
    brightOrange,
    backgroundColor,
    periwinkle
  },
  primaryColor: 'periwinkle',
  autoContrast: true,
  luminanceThreshold: 0.44,
  fontFamily: 'Montserrat, sans-serif',
  headings: {
    fontFamily: 'Greycliff CF, sans-serif',
    fontWeight: '700',},
  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
});

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
  return (
      <SessionProvider session={session}>
        <MantineProvider theme={theme}>
          <EdgeStoreProvider>
            <Component {...pageProps} />
          </EdgeStoreProvider>
        </MantineProvider>
      </SessionProvider>
  )
}
