import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <meta property="og:description" content="A chatbot powered by OpenAI to generate text and images" />
            <meta property="og:image" content="https://pbs.twimg.com/media/FrY0bZyXgAEhyeT?format=jpg&name=4096x4096" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
