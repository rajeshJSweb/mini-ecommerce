import React from 'react'
import HomeContainer from './HomeContainer/HomeContainer'
import { motion } from 'framer-motion';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import RowContainer from './RowContainer/RowContainer';
import { useStateValue } from './../context/StateProvider';
import {useState, useEffect } from 'react';
import MenuContainer from './MenuContainer/MenuContainer';


const MainContainer = () => {
  const [{foodItems}, dispatch]=useStateValue()
  const [scrollValue, setScrollValue]=useState(0)

  useEffect(()=>{},[setScrollValue])
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer></HomeContainer>
      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='font-semibold text-headingColor text-2xl capitalize relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
          transition-all ease-in-out duration-100'>Our Fresh & Healthy Fruits</p>
          <div className='hidden md:flex gap-3 items-center '>
              <motion.div 
              onClick={()=>setScrollValue(-200)}
              whileTap={{scale:0.75}} 
              className='w-8 h-8 rounded-lg bg-orange-300 
               hover:bg-orange-500 hover:shadow-lg cursor-pointer flex items-center justify-center'>
                <MdChevronLeft className='text-white font-semibold text-2xl' />
                </motion.div>
              <motion.div onClick={()=>setScrollValue(200)} whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-orange-300 
               hover:bg-orange-500 hover:shadow-lg cursor-pointer flex items-center justify-center'>
                <MdChevronRight className='text-white font-semibold text-2xl' />
                </motion.div>
          </div>
        </div>
        <RowContainer
        scrollValue={scrollValue} 
        flag={true} 
        data={foodItems?.filter((n)=>n.category==="Icecreame")} />
      </section>
      <MenuContainer></MenuContainer>
    </div>
  )
}

export default MainContainer