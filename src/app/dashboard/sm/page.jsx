"use client"
import React, { useState } from "react";
import SubNavbar from "@/app/components/subNavbar";
import axios from "axios";

const Page = () => {
  const [buttonText, setButtonText] = useState("Get started");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonClick = async () => {
    try {
      setButtonText("Please wait");
      setIsButtonDisabled(true);
      // Make the API call
      const response = await axios.get("/api/leaderboard");
      // Handle the API response
      console.log(response.data.data);
      
      


      // Reset the button text and enable the button
      setButtonText("Get started");
      setIsButtonDisabled(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      // Optionally, handle error and reset the button text and enable the button
      setButtonText("Get started");
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <SubNavbar />
      <div className="h-[86svh] flex justify-center items-center flex-col px-4">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            Social Media Leaderboard
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
            You can generate leaderboard for social media with this tool
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <button
              className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg ${
                isButtonDisabled ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
              }`}
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
            >
              {buttonText}
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto w-[80%] md:w-[90%]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" colSpan={2} className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <tr key={index} className=" border-b bg-gray-800 border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      Apple MacBook Pro 17
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">Edit</td>
                    <td className="px-6 py-4">Delete</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
