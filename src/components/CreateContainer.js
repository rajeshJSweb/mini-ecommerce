import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader/Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from './../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from './../context/StateProvider';



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
  const [{}, dispatch]=useStateValue();


  const upLoadImage=(e)=>{
      setIsLoading(true);
      const imageFile = e.target.files[0]
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot)=>{
      const uploadProgess = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    },(error)=>{
      console.log(error);
      setFields(true);
      setMsg("Error while uploading: tray again");
      setAlertStatus('danger');
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);
      },4000)
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg("Image uploaded succe");
        setAlertStatus('Successfully');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
    })
    }

  const deleteImage=()=>{
    setIsLoading(false)
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg("Image Deleted successfully");
      setAlertStatus('Success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    })
  }

  const uploadDetails=(e)=>{
    setIsLoading(true)
    try{
      if(!title || !calories || !imageAsset || !price || !category){
      setFields(true);
      setMsg("Required fiedls must be empty");
      setAlertStatus('danger');
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);
      },4000)
      }
      else{
        const data = {
          id: `${Date.now()}`,
          title:title,
          imageURL: imageAsset,
          category:category,
          calories: calories,
          qty:1,
          price:price
        }
        saveItem(data)
        setIsLoading(false)
        setFields(true)
        clearData();
        setMsg("Data Uploaded successfully");
        setAlertStatus('Success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    }catch(error){
      console.log(error);
      setFields(true);
      setMsg("Error while uploading: tray again");
      setAlertStatus('danger');
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);
      },4000);
    }

    fetchData()
  }

  const clearData=()=>{
    setTitle("");
    setImageAsset(null);
    setCalories('');
    setPrice('');
    setCategory('Select Category')
  };

  const fetchData = async()=>{
    await getAllFoodItems().then(data=>{
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data
      })
    })
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
              className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500'
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
                    <MdFoodBank className='text-gray-700 text-2xl'/>
                    <input type="text" value={calories} onChange={(e)=> setCalories(e.target.value)} required placeholder='Calories' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400' />
                </div>
                <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                    <MdAttachMoney className='text-gray-700 text-2xl'/>
                    <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} required placeholder='Price' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400' />
                </div>
          </div>
            <div className='flex items-center w-full'>
              <button className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={uploadDetails}>Upload</button>
            </div>
      </div>
    </div>
  
    )
}

export default CreateContainer