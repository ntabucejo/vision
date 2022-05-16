import type { NextPage, GetServerSideProps } from 'next'
import { useEffect } from 'react'
import Header from '../../../components/Header'
import Layout from '../../../components/Layout'
import Main from '../../../components/Main'
import Page from '../../../components/Page'
import type { IUser } from '../../../library/schemas/interfaces'
import useClientStore from '../../../library/stores/client'
import objectified from '../../../library/utilities/objectified'
import prisma from '../../../library/utilities/prisma'

interface IProps {
  initialUser: IUser
}

const Home: NextPage<IProps> = ({ initialUser }) => {
  const user = useClientStore<IUser>((state) => state.user)

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!user.id) return <></>

  console.log(user)

  return (
    <Page title={`Home | @${user.username}`}>
      <Layout>
        <Header />
        <Main>
          <section>Home Page</section>
        </Main>
      </Layout>
    </Page>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(query.userId) },
    include: {
      members: {
        include: {
          _count: { select: { tasks: true } },
          project: {
            include: {
              _count: { select: { members: true, tasks: true } },
            },
          },
        },
      },
    },
  })

  return {
    props: {
      initialUser: objectified(user),
    },
  }
}
