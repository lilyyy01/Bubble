import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from "./components/navBar";
//import Login from './client/login'

const Home: NextPage = () => {
  return (
    <div>
        <Header />
      <main>
        <div>Settings Page</div>
      </main>
    </div>
  )
}

export default Home