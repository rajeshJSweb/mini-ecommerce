import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header'
import MainContainer from './components/MainContainer';
import CreateContainer from './components/CreateContainer';

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
    <div className='w-screen h-auto flex flex-col bg-primary'>
      <Header/>
      <main className='mt-14 md:mt-24 px-8 md:px-20 py-4 w-full'>
        <Routes>
          <Route path='/*' element={<MainContainer/>}/>
          <Route path='/createItem' element={<CreateContainer/>}/>
        </Routes>
      </main>
      </div>
    </AnimatePresence>
  )
}

export default App