import React from 'react'
import NavConnected from '../components/NavConnected';

function Parameters() {
  return (
    <div className=" h-svh  m-auto">
      <NavConnected></NavConnected>

      <div className="h-20"></div>
      <div className="w-3/4 h-3/4 m-auto">
        <div className="grid grid-cols-2 grid-rows-2  h-full my-[15px] mx-10">
          <div className="bg-gradient-to-tl from-secondary-500 to-secondary-100  rounded-xl m-4 flex flex-col justify-center text-text  items-center shadow-lg hover:shadow-2xl ease-in duration-200 ">
            <p className="font-bold fixed mb-24 font-inter">Steps goal:</p>
            <p className=" font-inter text-5xl m-3 hover:bg-secondary-500 hover:opacity-50 hover:rounded-xl hover:p-2 hover:cursor-pointer">7620</p>
          </div>
          <div className="font-inter bg-gradient-to-tl from-secondary-500 to-secondary-100  rounded-xl m-4 flex flex-col justify-center text-text  items-center row-span-2 shadow-lg hover:shadow-2xl ease-in duration-200">
          <p className="font-bold fixed mb-28">Bedtime:</p>
          <p className="text-6xl m-3 hover:bg-secondary-500 hover:opacity-50 hover:rounded-xl hover:p-2 hover:cursor-pointer">23:30</p>
          </div>
          <div className=" font-inter bg-gradient-to-tl from-secondary-500 to-secondary-100  rounded-xl m-4 flex flex-col justify-center text-text items-center shadow-lg hover:shadow-2xl ease-in duration-200">
          <p className="font-bold fixed mb-20">Fitbit connexion status:</p>
          <p className="text-4xl text-red-500 m-3 hover:bg-secondary-500 hover:opacity-50 hover:rounded-xl hover:p-2 hover:cursor-pointer">Not Connected</p>
          </div>
          {/* emoji vert si valide sinon rouge et proposition de se connecter à fitbit*/}
        </div>
      </div>
    </div>
  );
}

export default Parameters
