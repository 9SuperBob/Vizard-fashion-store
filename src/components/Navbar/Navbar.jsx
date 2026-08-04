import React from "react";
import  DropdownMenu  from "./DropdownMenu";

function Navbar() {
  return (
    <div>
      <section>
        <div className="h-10 w-100% bg-black mx-auto text-white">
          <div className="flex justify-between items-center h-10 px-4 ">
            <p>EN | STORE LOCATION</p>
            <p>20% off with sms or email sign up</p>
            <p>02-111-1111</p>
          </div>
        </div>
      </section>
      <nav
        className="min-h-20 w-full bg-white flex justify-between items-center mx-auto px-15 relative"
        style={{ zIndex: 1000 }}
      >
        <div className="flex gap-16">
          <a href="#" className="hover:text-gray-600 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Story
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Categories
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Shop
          </a>
        </div>

        <h3 className="text-4xl font-bold text-center">Vizard</h3>

        <div className="flex gap-16 items-center">
          <div className="flex justify-center items-center gap-1 hover:text-gray-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
              />
            </svg>
            <a href="#">SEARCH</a>
          </div>
          <div>
            <DropdownMenu />
          </div>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Contact
          </a>

          {/* Dropdown Menu with proper z-index */}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
