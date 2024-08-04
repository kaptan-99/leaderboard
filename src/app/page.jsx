import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row w-full md:h-screen h-[86svh] bg-green-100">
      <div className="flex-1 flex justify-center items-center flex-col md:order-2">
        {/* Right content goes here */}
        <h1 className='text-3xl font-bold mb-4 text-center'>You can generate your own leaderboard</h1>

        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            Generate Now
          </button>
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-center md:order-1">
        <img src="leaderboard.png" alt="leaderboard.png" className="max-w-full h-auto" />
      </div>
    </div>
  )
}

export default Page
