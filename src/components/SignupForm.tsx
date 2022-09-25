import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const SignupForm = () => {
  return (
    <div className='max-w-md mx-auto mt-4 bg-yellow-100 p-8 border border-gray-3000'>
      <h1 className='text-3xl font-bold text-blue-600 pb-5'>
        Sign-up form using FaceIO
      </h1>

      <form className='space-y-6'>
        <div>
          <label
            htmlFor=''
            className='text-sm font-bold backdrop:bold text-gray-600 block'
          >
            Name
          </label>
          <input
            type='text'
            placeholder='name'
            className='w-full p-2 border border-blue-900 rounded mt-1'
          />
        </div>
        <div>
          <label
            htmlFor=''
            className='text-sm font-bold backdrop:bold text-gray-600 block'
          >
            Email
          </label>
          <input
            type='text'
            placeholder='email@mail.com'
            className='w-full p-2 border border-blue-900 rounded mt-1'
          />
        </div>
        <div>
          <button className='w-full py-2 px-4 bg-blue-700 rounded-md text-white text-sm'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
