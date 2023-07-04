import React from 'react';
import Image from 'next/image'
import logo from '../../../public/Images/logo.png'
import { HiPencilSquare } from "react-icons/hi2";
import { FiLogIn } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

const Header = () => {
    const { data: session } = useSession()
    const router = useRouter()

    // const USER_IMAGE = 'https://picsum.photos/id/1/200/300'
    return (
        <div className='flex justify-between p-4 border-b-2 border-blue-500'>
            <Image onClick={() => router.push('/')} src={logo} alt='logo'
                className='w-[145px] cursor-pointer' />

            <div className='flex gap-5 '>

                <button
                    onClick={() => router.push('/add-project')}
                    className='p-3 bg-black text-white rounded-full'>
                    <span className='sm:block hidden font-semibold'>ADD PROJECT</span>
                    <HiPencilSquare className='sm:hidden block' />
                </button>

                <button
                    className='p-3 bg-gray-200 text-gray-700 rounded-full'
                >
                    {
                        !session ?
                            <span onClick={() => signIn()} className='sm:block hidden font-semibold'>SIGN IN</span>
                            :
                            <span onClick={() => signOut()} className='sm:block hidden font-semibold'>SIGN OUT</span>
                    }
                    {
                        !session ?
                            <FiLogIn onClick={() => signIn()} className='Login sm:hidden block' />
                            :
                            <CiLogout onClick={() => signOut()} className='Logout sm:hidden block' />
                    }
                </button>

                {session ?
                    <Image
                        onClick={() => router.push('/profile')}
                        className='rounded-full cursor-pointer' src={session.user.image} alt='logo' width={40} height={40} />
                    :
                    null
                }
            </div>
        </div>
    );
};

export default Header;