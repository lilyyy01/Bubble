import type { NextPage } from 'next'
import { Header } from "../components/navBar";
//import Login from './client/login'

const Home: NextPage = () => {
  return (
    <div>
      <Header/>
      <main>
        <div>Friends Page!</div>
      </main>
    </div>
  )
}

export default Home 
