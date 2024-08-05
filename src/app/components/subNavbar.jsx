import React from 'react'

const SubNavbar = () => {
  return (
    <nav class="bg-green-800">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
            <div class="flex items-center">
                <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                    <li>
                        <a href="#" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Social Media</a>
                    </li>
                   
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default SubNavbar