import React from 'react'
import {IoFastFood} from 'react-icons/io5'
import { useState } from 'react';
import {categories} from '../../utils/data'
import { motion } from 'framer-motion';
import RowContainer from '../RowContainer/RowContainer';
import { useStateValue } from './../../context/StateProvider';

const MenuContainer = () => {
    const [filter, setFilter]=useState('chicken')
    const [{foodItems}, dispatch]=useStateValue()
  return (
    <section className='w-full my-6'>
        <div className='w-full flex flex-col items-center justify-center'>
            <p className='font-semibold text-headingColor text-2xl capitalize relative before:absolute before:rounded-lg before:content 
            before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 mr-auto transition-all duration-100 ease-in-out'>Our Hot Dishes</p>
        </div>
        <div className='w-auto flex items-center justify-center gap-8 my-6 overflow-x-scroll scrollbar-none'>
            {
               categories && categories.map(category =>(
                <motion.div whileTap={{scale:0.50}} onClick={()=>setFilter(category.urlParamName)} className={`group w-24 min-w-[94px] h-28 ${filter===category.urlParamName?"bg-red-600":"bg-slate-200"} hover:bg-red-600 flex gap-3 flex-col items-center justify-center drop-shadow-xl rounded-lg cursor-pointer `}>
                <div className={`w-10 h-10 rounded-full ${filter===category.urlParamName?"bg-slate-200":"bg-red-600"} group-hover:bg-slate-200 flex items-center justify-center`}>
                    <IoFastFood className={`${filter===category.urlParamName?"text-slate-800":"text-slate-200 "}text-xl group-hover:text-slate-800`}/>
                </div>
                <p className={`${filter===category.urlParamName?"text-white":"text-slate-800"} font-semibold group-hover:text-white`}>{category.name}</p>
            </motion.div>
                ))
            }
        </div>
        <div className='w-full'>
            <RowContainer flag={false} data={foodItems?.filter((item)=>item.category===filter)}/>
        </div>
    </section>
  )
}

export default MenuContainer