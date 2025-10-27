import React, { useContext } from 'react'
import Banner from '../components/Banner'
import About from './About'
import Services from './Services'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const {loading} = useContext(AuthContext);
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <Banner/>
      <About/>
      <Services/>
    </div>
  )
}

export default Home
