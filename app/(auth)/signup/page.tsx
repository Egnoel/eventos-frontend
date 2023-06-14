'use client';
import '../styles.css';
import React, { useState, FormEvent, useEffect } from 'react';
import { FaUser, FaLock, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserProps, fetchWrapper } from '@/app/functions/fetch';

const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await fetchWrapper<UserProps>('user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          favorites: [],
        }),
      });
      console.log(data.user);
      console.log(data.token);

      if (data.token === undefined) {
        console.log('token undefined');
      } else {
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <form className="login" onSubmit={handleSignUp}>
        <div className="login__field">
          <FaUser className="login__icon" />
          <input
            type="text"
            className="login__input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="login__field">
          <FaUser className="login__icon" />
          <input
            type="text"
            className="login__input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="login__field">
          <FaUser className="login__icon" />
          <input
            type="text"
            className="login__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__field">
          <FaLock className="login__icon" />
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button login__submit">
          <span className="button__text">Sign Up Now</span>
          <FaChevronRight className="button__icon" />
        </button>
      </form>
      <div className="social-login">
        <h3>
          Already registered? <Link href="/login">Log In</Link>
        </h3>
      </div>
    </>
  );
};

export default Sign;
