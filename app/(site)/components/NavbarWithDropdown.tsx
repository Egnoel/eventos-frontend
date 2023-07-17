'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { Dropdown, Navbar, Avatar } from 'flowbite-react';
import { User } from '@/app/functions/fetch';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavbarWithDropdown() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }, [router]);
    
      useEffect(() => {
        const userString: string | null = localStorage.getItem('user');
        if (userString) {
          const parsedUser: User = JSON.parse(userString);
          setUser(parsedUser);
          console.log(parsedUser._id);
        }
      }, []);
  return (
    <Navbar
      fluid
      rounded
      className='fixed top-0 left-0 z-10 w-full '
    >
      <Navbar.Brand href="/">
        <img
          alt="Flowbite React Logo"
          className="h-6 mr-3 sm:h-9"
          src="/images/kamba-eventos-logo.png"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Kamba Eventos
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={<Avatar alt="User settings" img={
            user?.pic ||
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
          } rounded/>}
        >
          <Dropdown.Header>
            <span className="block text-sm">
            {user?.firstName}  {user?.lastName}
            </span>
            <span className="block text-sm font-medium truncate">
            {user?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
          <Link href="/profile">Profile</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <button type='button' onClick={logout}>Sign out</button>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="/"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="/search">
          Pesquisar
        </Navbar.Link>
        
        <Navbar.Link href="/favorites">
          Favoritos
        </Navbar.Link>
        <Navbar.Link href="/subscribed">
          Inscritos
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


