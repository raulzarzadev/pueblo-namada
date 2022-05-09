import { INFO } from '@/CONSTANTS/PROJECT'
import NextHead from 'next/head'

export default function Head({ title = INFO.short_name }) {
  return (<NextHead>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
    />
    <meta name="description" content="Description" />
    <meta name="keywords" content="Keywords" />
    <title>{title}</title>

    <link rel="manifest" href="/manifest.json" />
    <link
      href="/icons/icon-48x48.png"
      rel="icon"
      type="image/png"
      sizes="48x48"
    />

    <link rel="apple-touch-icon" href="/apple-icon.png"></link>
    <meta name="theme-color" content="#317EFB" />
  </NextHead>)
}
