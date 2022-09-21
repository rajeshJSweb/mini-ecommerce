import React from 'react'
import HomeContainer from './HomeContainer/HomeContainer'


const MainContainer = () => {
  return (
    <div className='w-full h-autoflex flex-col items-center justify-center'>
      <HomeContainer></HomeContainer>
      <section className='w-full'>
        <div className='w-full flex items-center justify-between'>
          <p className='font-semibold text-headingColor text-2xl capitalize relative 
          before:absolute before:rounded-lg before:content before:w-20 
          before:h-1 before:bottom-0 before:left-0 before:bg-orange-500
          transition-all ease-in-out duration-100'>Our Fresh & Healthy Fruits</p>
        </div>
      </section>
    </div>
  )
}

export default MainContainer