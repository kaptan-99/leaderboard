import Link from 'next/link'
import React from 'react'

const SubNavbar = () => {
  return (
    <nav class="bg-green-800">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
            <div class="flex items-center">
                <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                        <Link href="/dashboard" class="text-gray-900 dark:text-white hover:underline" aria-current="dashboard">Home</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/sm" class="text-gray-900 dark:text-white hover:underline" aria-current="sm">Social Media</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default SubNavbar