import React from 'react'
import bikeDelivery from '../../Assets/img/delivery.png'
import heroBg from '../../Assets/img/heroBg.png'
import { heroData } from './../../utils/data';

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      {/* Section 1 */}
      <div className='py-2 flex flex-col items-start justify-center gap-6'>
        <div className='flex items-center gap-2 justify-center bg-orange-200 p-2 rounded-full'>
          <p className='text-base text-orange-500 font-semibold'>
            Bike Delivery
          </p>
          <div className='w-7 h-7 rounded-full overflow-hidden'>
            <img className='w-full h-full object-contain bg-white overflow-hidden drop-shadow-xl' src={bikeDelivery} alt="delivery" />
          </div>
        </div>
        <p className='text-[2.5rem] lg:text-[4rem] font-extrabold tracking-wide text-headingColor'>The Fastest Delivery in <span className='text-orange-500 text-[3rem] lg:text-[5rem] font-bold'>Your City</span></p>
        <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptas blanditiis quo sed quas officiis quia assumenda dolore, sapiente adipisci.</p>
        <button className='w-full md:w-auto bg-gradient-to-br from-orange-300 to-orange-500 px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100' type='button'>Order Now</button>
      </div>
      {/* Section 2 */}
      <div className='py-2 flex-1 items-center relative'>
        <img className='h-320 w-full lg:w-auto lg:h-650 ml-auto' src={heroBg} alt="" />
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 gap-4 flex-wrap drop-shadow-lg'>
          {
            heroData && heroData.map(data =>(
              <div className='lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center'>
                <img className='w-20 lg:w-40 -mt-10 lg:-mt-20' src={data.img} alt="i1" />
                <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>{data.name}</p>
                <p className='text-[10px] lg:text-sm font-semibold text-textColor my-1 lg:my-3'>{data.desc}</p>
                <p className='text-base'>$<span className='text-red-500'>{data.price}</span></p>
            </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default HomeContainer