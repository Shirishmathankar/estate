import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
    <div className="bg-slate-200 shadow-lg">
      <header className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center mx-auto p-4 max-w-6xl w-full">
        <Link to="/">
          <h1 className="text-center sm:text-left">
            <span className="text-slate-400 text-lg sm:text-xl font-semibold">ShirishE</span>
            <span className="text-lg sm:text-xl font-semibold">State</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 w-full sm:w-auto px-3 py-2 rounded-md flex items-center justify-between gap-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent flex-1 min-w-0"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline hover:underline font-semibold">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline font-semibold">About</li>
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
              <li className="hover:underline font-semibold">Sign in</li>
            )}
          </Link>
        </ul>
      </header>
    </div>
  );
};

export default Header;
