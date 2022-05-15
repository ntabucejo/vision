import Head from 'next/head'

interface IPage {
  children: React.ReactNode
  title: string
}

const Page = ({ children, title }: IPage) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

export default Page
