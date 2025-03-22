import React from 'react'

function LayoutProvider({ heading, children }) {
    return (
        <div className='w-full h-screen flex flex-col'>
            <div className="bg-blue-800 shadow-md w-full rounded-lg text-white text-center text-3xl py-5 font-semibold">
                {heading}
            </div>
            <div className='overflow-y-auto pb-10 pt-6 px-3 flex-1 scroll-smooth'>
                {children}
            </div>
        </div>
    )
}

export default LayoutProvider