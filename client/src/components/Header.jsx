import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-slate-200 shadow-lg flex justify-between items-center mx-auto p-3 max-w-full">
     <Link to='/'> <h1>
        <span className="text-slate-400 text-sm sm:text-xl">E</span>
        <span className="text-sm sm:text-xl">State</span>
      </h1></Link>
      
      <form className="bg-slate-50 p-3 rounded-md">
        <input type="text" placeholder="Search.." className="focus:outline-none bg-transparent" />
      </form>
      <ul className="flex gap-3 ">
       <Link to="/Profile"> <li className="hidden sm:inline hover:underline">
          Profile
        </li></Link>
        <Link to='/about'><li className="hidden sm:inline hover:underline">
          About
        </li></Link>
       <Link to='/sign-in'><li className='hover:underline'>
          Sign in
        </li></Link>
      </ul>
    </header>
  );
};

export default Header;
