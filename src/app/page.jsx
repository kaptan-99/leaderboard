import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex w-full h-screen bg-green-100">
    <div className="flex-1 flex justify-center items-center">
     <img src="leaderboard.png" alt="leaderboard.png" />
    </div>
    <div className="flex-1 flex justify-center items-center flex-col">
      {/* Right content goes here */}
     <h1 className='text-3xl font-bold mb-4 text-center'>You can generate your own leaderboard</h1>

      <Link href="/login">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate Now
        </button>
      </Link>

    </div>
  </div>

  )
}

export default page