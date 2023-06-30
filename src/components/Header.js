import React from 'react';
import Image from 'next/image'
import logo from '../../public/Images/logo.png'
import { HiPencilSquare } from "react-icons/hi2";
import { FiLogIn } from "react-icons/fi";


const Header = () => {
    const USER_IMAGE = 'https://picsum.photos/id/1/200/300'
    return (
        <div className='flex justify-between p-4 border-b-2 border-blue-500'>
            <Image src={logo} alt='logo' width={145} />

            <div className='flex gap-5 '>

                <button className='p-3 bg-black text-white rounded-full'>
                    <span className='sm:block hidden'>CREATE POST</span>
                    <HiPencilSquare className='sm:hidden block' />
                </button>

                <button className='p-3 bg-gray-200 text-gray-700 rounded-full'>
                    <span className='sm:block hidden'>SIGN IN</span>
                    <FiLogIn className='sm:hidden block' />
                </button>

                <Image className='rounded-full' src={USER_IMAGE} alt='logo' width={40} height={40} />
            </div>
        </div>
    );
};

export default Header;