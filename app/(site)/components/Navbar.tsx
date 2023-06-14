'use client';
import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/app/functions/fetch';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const info = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }, []);

  useEffect(() => {
    const userString: string | null = localStorage.getItem('user');
    if (userString) {
      const parsedUser: User = JSON.parse(userString);
      setUser(parsedUser);
      console.log(parsedUser._id);
    }
  }, []);

  return (
    <nav className="flex flex-row items-center justify-between px-10 py-5 text-black bg-white">
      <Link href={'/'}>Kamba Eventos</Link>
      <div className="flex flex-row items-center gap-2 flex-x-2">
        <p>{user?.firstName}</p>

        <div className="relative cursor-pointer" onClick={info}>
          <Image
            src={
              user?.pic ||
              'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
            }
            alt="user avatar"
            className="object-cover rounded-full "
            width="50"
            height={'50'}
          />
          {isOpen && (
            <div className="absolute top-16 left-2">
              <Link href="/profile">Profile</Link>
              <p onClick={logout}>LogOut</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
