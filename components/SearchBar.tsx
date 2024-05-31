'use client';

import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
}

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/chat/getusers'); 
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUserClick = (userId: string) => {
    router.push(`/chat/${userId}`);
    setSearchText("")
  };

  return (
    <div className='pb-2 border-b-2 border-[#E3E6E8]'>
      <div className='flex items-center gap-2 bg-[#E3E6E8] rounded-xl px-2 py-3'>
        <CiSearch size="24px" />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='bg-transparent outline-none w-full'
          type="text"
          placeholder='Search or start new chat'
        />
      </div>
      {searchText && (
        <ul className='mt-2 bg-white rounded-xl shadow-lg'>
          {filteredUsers.map(user => (
            <li
              key={user._id}
              className='flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-200'
              onClick={() => handleUserClick(user._id)}
            >
              <img src={user.avatar} alt={user.fullname} className='w-10 h-10 rounded-full' />
              <div>
                <div className='font-bold'>{user.fullname}</div>
                <div className='text-sm text-gray-600'>{user.username}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
