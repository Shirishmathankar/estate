import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className="bg-slate-200 shadow-md w-full">
      <header className="flex justify-between items-center p-3 max-w-6xl mx-auto gap-4 overflow-x-auto">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-slate-700 text-sm sm:text-xl font-bold whitespace-nowrap">
            <span className="text-slate-400">ShirishE</span>
            <span>State</span>
          </h1>
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-slate-50 px-2 py-1 rounded-md w-full max-w-[300px] sm:max-w-[400px]"
        >
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow bg-transparent focus:outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        {/* Navigation */}
        <ul className="flex items-center gap-4 flex-shrink-0">
          {/* Show only on sm and above */}
          <Link to="/" className="hidden sm:inline">
            <li className="hover:underline font-medium text-sm sm:text-base">Home</li>
          </Link>
          <Link to="/about" className="hidden sm:inline">
            <li className="hover:underline font-medium text-sm sm:text-base">About</li>
          </Link>

          {/* Profile or Sign in - Always visible */}
          <Link to="/profile">
            {currentUser ? (
              <img
                src={
                  currentUser.avatar ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGylI3uBTUYSwfiDYT9UnFXYPYLChX2ltSJvsjAOKGokgRQeJ158QoAAzk-HyfmuWlTJ8&usqp=CAU'
                }
                alt="profile"
                className="rounded-full object-cover w-8 h-8"
              />
            ) : (
              <li className="hover:underline font-medium text-sm sm:text-base">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </header>
    </div>
  );
};

export default Header;
