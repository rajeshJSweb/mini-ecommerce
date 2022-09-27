import React, { useEffect, useRef } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion';
import NotFound from '../../Assets/img/NotFound.svg'

const RowContainer = ({flag,data,scrollValue}) => {
    
    const rowContainer=useRef()

    useEffect(()=>{
        rowContainer.current.scrollLeft +=scrollValue;
    },[scrollValue])

  return (
    <div
    ref={rowContainer} 
    className={`w-full flex gap-3 scroll-smooth my-8 ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap items-center justify-center"}`}>
        {
            data?.length>0? data.map(item => (
         <div key={item.id} className='w-300 min-w-[300px] md:w-340 md:min-w-[340px] my-4 lg:my-12 
          bg-gray-100 hover:drop-shadow-md rounded-lg p-2 backdrop-blur-md'>
            <div className='w-full flex  items-center justify-between'>
            <motion.img 
                    whileHover={{scale:1.20}} 
                    className='w-32 h-32 -mt-8 drop-shadow-2xl' 
                    src={item?.imageURL} alt="" />
            <motion.div 
            whileTap={{scale:0.75}} 
            className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md'>
            <MdShoppingBasket className='text-white'/>
            </motion.div>
            </div>
            <div className='w-full flex flex-col items-end justify-end'>
                <p className='text-black font-semibold text-base lg:text-lg'>{item?.title}</p>
                <p className='mt-1 text-sm text-gray-500'>{item?.calories}</p>
                <div className='flex items-center gap-8'>
                    <p className='text-lg text-headingColor font-semibold'><span className='text-sm text-red-500'>$</span>{item?.price}</p>
                </div>
            </div>
            </div>
            ))
            :
            <div className='h-full w-full scrollbar-none flex items-center justify-center'>
                <img src={NotFound} alt="" className='h-[320px]' />
                <h1>Not Found</h1>
            </div>
        }
    </div>
  )
}

export default RowContainer