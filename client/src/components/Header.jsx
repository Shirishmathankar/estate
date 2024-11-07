import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <div className='bg-slate-200 shadow-lg'>
    <header className=" flex justify-between items-center mx-auto p-3 max-w-6xl">
     <Link to='/'> <h1>
        <span className="text-slate-400 text-sm sm:text-xl font-semibold">E</span>
        <span className="text-sm sm:text-xl font-semibold">State</span>
      </h1></Link>
      
      <form className="bg-slate-50 p-3 rounded-md">
        <input type="text" placeholder="Search.." className="focus:outline-none bg-transparent" />
      </form>
      <ul className="flex gap-3 ">
       <Link to="/"> <li className="hidden sm:inline hover:underline font-semibold">
         Home
        </li></Link>
        <Link to='/about'><li className="hidden sm:inline hover:underline font-semibold">
          About
        </li></Link>

       <Link to='/profile'>
       {currentUser?<img src={currentUser.avatar} alt="profile" className='rounded-full object-cover w-8 h-8'/>:
       <li className='hover:underline font-semibold'>
          Sign in
        </li>}</Link>
      </ul>
    </header>
    </div>
  );
};

export default Header;
