import React, { useState } from 'react'
import Logo from '../Assets/img/logo.png'
import Avatar from "../Assets/img/avatar.png"
import {MdAddShoppingCart, MdAdd, MdLogout} from "react-icons/md"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config'
import { signInWithPopup } from 'firebase/auth';
import { useStateValue } from './../context/StateProvider';
import { actionType } from './../context/reducer';


const Header = () => {
  const firebaseAuth = getAuth(app)
  const googleProvider = new GoogleAuthProvider();

  const [{user}, dispatch]= useStateValue()

  const [isMenu, setIsMenu]=useState(false)

  const userLogin =async()=>{
    if(!user){
      const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, googleProvider)
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0]
    });
    localStorage.setItem('user', JSON.stringify(providerData[0]))
    }else{
      setIsMenu(!isMenu)
    }
  }

  const userLogOut = ()=>{
    setIsMenu(false)
    localStorage.clear()

    dispatch({
      type: actionType.SET_USER,
      user: null
    });
}

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16'>
        <div className='hidden md:flex w-full h-full'>
              <Link to="/" className='flex items-center gap-2'>
                <img src={Logo} className='w-8 object-cover' alt="log" />
                <p className='text-headingColor text-xl font-bold '>City</p>
              </Link>
              <div className='flex items-center ml-auto gap-8'>
                <motion.ul 
                initial={{opacity:0, x:200}}
                animate={{opacity:1, x:0}}
                exit={{opacity:0, x:200}}
                className='flex items-center gap-8'>
                  <li className='text-base text-textColor duration-100 translate-all ease-in-out hover:text-headingColor cursor-pointer'>Home</li>
                  <li className='text-base text-textColor duration-100 translate-all ease-in-out hover:text-headingColor cursor-pointer'>Menu</li>
                  <li className='text-base text-textColor duration-100 translate-all ease-in-out hover:text-headingColor cursor-pointer'>About Us</li>
                </motion.ul>

                <div className='relative flex'>
                  <MdAddShoppingCart className='text-textColor text-2xl gap-2 cursor-pointer'/>
                  <div className='absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center -ml-1'>
                  <p className='text-xs text-white font-semibold'>2</p></div>
                </div>

                <div className='relative'>
                <motion.img
                onClick={userLogin}
                whileTap={{scale:0.6}} src={user? user.photoURL: Avatar} className='w-10 cursor-pointer rounded-full min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl' alt="userProfile"
                 />
                 {
                  isMenu&& (
                    <motion.div 
                    initial={{opcity:0, scale:0.6}}
                    animate={{opcity:1, scale:1}}
                    exit={{opcity:0, scale:0.6}}
                    className='w-40 bg-primary shadow-xl rounded-lg absolute top-12 right-0 flex-col px-4 py-2'>
                  {
                    user && user.email === "rjshkhoksi26@gmail.com" &&(
                      <Link onClick={()=>setIsMenu(false)} to={'/createItem'}><p className='px-1 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 case-in-out text-textColor text-base'>New Item <MdAdd/></p></Link>
                    )
                  }
                  <p 
                  onClick={userLogOut}
                  className='px-1 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 case-in-out text-textColor text-base'>Logout <MdLogout/></p>
                 </motion.div>
                  )
                 }
                </div>
            </div> 
        </div>

        {/* Mobile device */}
        <div className='flex items-center justify-between md:hidden w-full h-full p-2'>
            <Link to="/" className='flex items-center gap-2'>
                <img src={Logo} className='w-8 object-cover' alt="log" />
                <p className='text-headingColor text-xl font-bold '>City</p>
            </Link>

            <div className='relative flex'>
                  <MdAddShoppingCart className='text-textColor text-2xl gap-2 cursor-pointer'/>
                  <div className='absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center -ml-1'>
                  <p className='text-xs text-white font-semibold'>2</p></div>
                </div>

            <div className='relative'>
                <motion.img
                onClick={userLogin}
                whileTap={{scale:0.6}} src={user? user.photoURL:Avatar} className='w-10 cursor-pointer rounded-full min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl' alt="userProfile"
                 />
                 {
                  isMenu&& (
                    <motion.div 
                    initial={{opcity:0, scale:0.6}}
                    animate={{opcity:1, scale:1}}
                    exit={{opcity:0, scale:0.6}}
                    className='w-40 bg-primary shadow-xl rounded-lg absolute top-12 right-0 flex-col px-4 py-2'>
                  {
                    user && user.email === "rjshkhoksi26@gmail.com" &&(
                      <Link 
                      onClick={()=> setIsMenu(false)} 
                       to={'/createItem'}><p 
                       className='px-1 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 case-in-out text-textColor text-base'>New Item <MdAdd/></p></Link>
                    )
                  }

                <ul className='flex flex-col p-1 gap-3'>
                  <li onClick={()=> setIsMenu(false)} className='py-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 case-in-out text-textColor text-base'>Home</li>
                  <li onClick={()=> setIsMenu(false)} className='py-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 case-in-out text-textColor text-base'>Menu</li>
                  <li onClick={()=> setIsMenu(false)} className='py-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 case-in-out text-textColor text-base'>About Us</li>
                </ul>
                  <p onClick={userLogOut} className='py-2 rounded-sm shadow-lg flex items-center font-medium justify-center bg-slate-300 gap-3 cursor-pointer hover:bg-orange-400 hover:text-white transition-all duration-100 case-in-out text-textColor text-base'>Logout <MdLogout/></p>
                 </motion.div>
                  )
                 }
                </div>
        </div>
    </header>
  )
}

export default Header