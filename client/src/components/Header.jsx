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
    urlParams?.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFormUrl = urlParams.get('searchTerm');
    if (searchTermFormUrl) {
      setSearchTerm(searchTermFormUrl);
    }
  }, [location.search]);

  return (
    <div className="bg-slate-200 shadow-lg w-full">
      <header className="flex flex-wrap justify-between items-center p-3 max-w-6xl mx-auto gap-2">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-slate-700 text-lg sm:text-xl font-semibold whitespace-nowrap">
            <span className="text-slate-400">ShirishE</span>
            <span>State</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-1 max-w-sm bg-slate-50 px-3 py-2 rounded-md"
        >
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent focus:outline-none text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        {/* Navigation / Profile */}
        <ul className="flex items-center gap-4 ml-2 whitespace-nowrap">
          <Link to="/">
            <li className="hover:underline font-semibold text-sm">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:underline font-semibold text-sm">About</li>
          </Link>
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
              <li className="hover:underline font-semibold text-sm">Sign in</li>
            )}
          </Link>
        </ul>
      </header>
    </div>
  );
};

export default Header;
