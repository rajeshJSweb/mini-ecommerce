import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader/Loader';



const CreateContainer = () => {
  const [title, setTitle]=useState("")
  const [calories, setCalories]=useState("")
  const [price, setPrice]=useState("")
  const [category, setCategory]=useState(null)
  const [imageAsset, setImageAsset]=useState(null)
  const [fields, setFields]=useState(false)
  const [alertStatus, setAlertStatus]=useState('danger')
  const [msg, setMsg]=useState(null)
  const [isLoading, setIsLoading]=useState(false)


  const upLoadImage=()=>{

  }

  const deleteImage=()=>{

  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
          {
            fields && (
              <motion.p
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              className={`w-full p-2 rounded-lg text-center ${alertStatus==='danger'? 'bg-red-500':'text-emerald-400'}`}>
                {msg}
              </motion.p>
            )
          }

          <div className='w-full py-2border border-gray-300 flex items-center gap-2'>
              <MdFastfood className='text-xl text-gray-700'/>
              <input 
              className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500'
              type="text"
              onChange={(e)=>setTitle(e.target.value)}
              required
              value={title}
              placeholder="Gime me your title"
              />
          </div>
          <div className='w-full'>
              <select className='w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer' onChange={(e)=>setCategory(e.target.value)}>
                <option value="other" className='bg-white'>Select Category</option>
                {
                  categories && categories.map(item => (
                    <option key={item.id} 
                    value={item.urlParamName}
                    className="text-base border-0 outline-none capitaliz bg-white text-headingColor">
                      {item.name}
                    </option>
                  ))
                }
              </select>
          </div>
          <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
                {
                  isLoading? <Loader />: <>
                    {!imageAsset?( <>
                    <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                      <div className='w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2'>
                        <MdCloudUpload className='text-gray-500 text-3xl'/>
                        <p className='text-gray-500 text-3xl'>Click here to upload</p>
                      </div>
                      <input 
                      className='w-0 h-0'
                      type="file" 
                      name='uploading' 
                      accept='image/*' 
                      onChange={upLoadImage} />
                    </label>
                    </>):(<>
                    <div className='relative h-full'>
                        <img className='w-full h-full object-cover' src={imageAsset} alt="uploaded image" />
                        <button
                        onClick={deleteImage}
                         type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 outline-none hover:shadow-md duration-500 transition-all'>
                          <MdDelete className='text-white'/>
                        </button>
                    </div>
                    </>) }
                  </>
                }
          </div>

          <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                    <MdFoodBank />
                </div>
          </div>

      </div>
    </div>
  
    )
}

export default CreateContainer