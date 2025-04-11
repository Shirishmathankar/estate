import React from 'react'
import Header from '../components/Header'

const About = () => {
  return (
    <>
    <Header/>
    <div className='py-20 px-4 max-w-6xl mx-auto'>
       <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Shirish Estate</h1>
       <p className='mb-4 text-slate-700'>
       ShirishEstate is your trusted destination for discovering the perfect place to call home. Whether you're looking to buy, rent, or explore investment opportunities, we've got you covered with verified listings and a seamless browsing experience
       </p>
       <p>
       We combine intuitive search filters, real-time updates, and modern design to help you find properties that truly match your needs — from cozy apartments to luxurious villas.

        With ShirishEstate, finding your next home is not just easy — it's effortless.

       </p>
    </div>
    </>
  )
}

export default About